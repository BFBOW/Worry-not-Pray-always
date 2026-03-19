export const config = {
  runtime: "nodejs",
};

interface SupportPetSelection {
  name: string;
  quantity: number;
}

interface SupportFormSubmission {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  postalCode: string;
  ageRanges: string[];
  optIn: boolean;
  pickupOthers?: string;
  householdCount?: number;
  dietaryPrefs: string[];
  dietaryNotes?: string;
  hygienePrefs: string[];
  hygieneNotes?: string;
  pets: SupportPetSelection[];
  petDetails?: string;
  additionalInfo?: string;
  confirmAck: boolean;
  contactTimezone?: string;
}

interface BrevoContactPayload {
  email: string;
  attributes: Record<string, string | number | boolean>;
  updateEnabled: boolean;
  listIds?: number[];
}

function readListId() {
  const rawValue = process.env.BREVO_LIST_ID ?? process.env.BREVO_SUPPORT_LIST_ID;
  if (!rawValue) return undefined;
  const parsed = Number(rawValue);
  return Number.isInteger(parsed) ? parsed : undefined;
}

function cleanText(value?: string | null) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function cleanList(values: string[]) {
  return values.map((value) => value.trim()).filter(Boolean);
}

function buildPetSummary(pets: SupportPetSelection[]) {
  return pets
    .filter((pet) => pet.quantity > 0)
    .map((pet) => `${pet.name}: ${pet.quantity}`)
    .join(", ");
}

function parsePostalCode(postalCode: string) {
  const compact = postalCode.replace(/\s+/g, "");
  return /^\d+$/.test(compact) ? Number(compact) : undefined;
}

function buildBrevoPayload(
  submission: SupportFormSubmission,
  listId?: number,
): BrevoContactPayload {
  const ageRanges = cleanList(submission.ageRanges);
  const dietaryPrefs = cleanList(submission.dietaryPrefs);
  const hygienePrefs = cleanList(submission.hygienePrefs);
  const petSummary = buildPetSummary(submission.pets);
  const petCount = submission.pets.reduce((total, pet) => total + Math.max(0, pet.quantity), 0);
  const numericPostalCode = parsePostalCode(submission.postalCode);

  const additionalInfoParts = [
    cleanText(submission.additionalInfo),
    numericPostalCode === undefined ? `Postal code: ${submission.postalCode}` : undefined,
  ].filter(Boolean);

  const attributes: Record<string, string | number | boolean> = {
    FIRSTNAME: submission.firstName.trim(),
    LASTNAME: submission.lastName.trim(),
    OPT_IN: submission.optIn,
    CONFIRM_ACK: submission.confirmAck,
    CONTACT_TIMEZONE: cleanText(submission.contactTimezone) ?? "America/Toronto",
  };

  if (cleanText(submission.phone)) attributes.SMS = submission.phone!.trim();
  if (numericPostalCode !== undefined) attributes.POSTAL_CODE = numericPostalCode;
  if (ageRanges.length > 0) attributes.AGE_RANGES = ageRanges.join(", ");
  if (cleanText(submission.pickupOthers)) attributes.PICKUP_OTHERS = submission.pickupOthers!.trim();
  if (typeof submission.householdCount === "number" && !Number.isNaN(submission.householdCount)) {
    attributes.HOUSEHOLD_COUNT = submission.householdCount;
  }
  if (dietaryPrefs.length > 0) attributes.DIETARY_PREFS = dietaryPrefs.join(", ");
  if (cleanText(submission.dietaryNotes)) attributes.DIETARY_NOTES = submission.dietaryNotes!.trim();
  if (hygienePrefs.length > 0) attributes.HYGIENE_PREFS = hygienePrefs.join(", ");
  if (cleanText(submission.hygieneNotes)) attributes.HYGIENE_NOTES = submission.hygieneNotes!.trim();
  if (petCount > 0) attributes.PET_COUNT = petCount;
  if (submission.pets.length > 0) attributes.PET_INFO = submission.pets.map((pet) => pet.name).join(", ");

  const petDetails = [cleanText(submission.petDetails), petSummary].filter(Boolean).join(" | ");
  if (petDetails) attributes.PET_DETAILS = petDetails;
  if (additionalInfoParts.length > 0) attributes.ADDITIONAL_INFO = additionalInfoParts.join(" | ");

  const payload: BrevoContactPayload = {
    email: submission.email.trim(),
    attributes,
    updateEnabled: true,
  };

  if (typeof listId === "number" && Number.isInteger(listId)) {
    payload.listIds = [listId];
  }

  return payload;
}

function validateSubmission(submission: SupportFormSubmission) {
  if (!submission.firstName?.trim()) return "First name is required.";
  if (!submission.lastName?.trim()) return "Last name is required.";
  if (!submission.email?.trim()) return "Email is required.";
  if (!submission.postalCode?.trim()) return "Postal code is required.";
  if (!submission.confirmAck) {
    return "All acknowledgments must be selected.";
  }
  return undefined;
}

function parseBrevoText(text: string): { message?: string; code?: string; [key: string]: unknown } {
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
}

function looksLikeConflict(status: number, data: { message?: string; code?: string }) {
  const text = `${data.code ?? ""} ${data.message ?? ""}`.toLowerCase();
  return (
    status === 400 ||
    status === 409 ||
    text.includes("duplicate") ||
    text.includes("already exists") ||
    text.includes("conflict") ||
    text.includes("sms") ||
    text.includes("phone")
  );
}

function withoutSms(payload: BrevoContactPayload): BrevoContactPayload {
  const { SMS, ...rest } = payload.attributes;
  return {
    ...payload,
    attributes: rest,
  };
}

async function brevoRequest(
  url: string,
  method: string,
  apiKey: string,
  body: unknown
) {
  const response = await fetch(url, {
    method,
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  const text = await response.text();
  const data = parseBrevoText(text);
  return { response, data };
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "BREVO_API_KEY is not configured." });
  }

  try {
    const submission = req.body as SupportFormSubmission;
    const validationError = validateSubmission(submission);
    if (validationError) {
      return res.status(400).json({ error: validationError });
    }

    const initialPayload = buildBrevoPayload(submission, readListId());
    const encodedEmail = encodeURIComponent(submission.email.trim());

    // 1. Try POST (Create)
    let { response, data } = await brevoRequest(
      "https://api.brevo.com/v3/contacts",
      "POST",
      apiKey,
      initialPayload
    );

    // 2. If conflict, try PUT (Update)
    if (!response.ok && looksLikeConflict(response.status, data)) {
      console.warn(`[Brevo] Conflict on POST for ${submission.email}, trying PUT...`);
      const updateResult = await brevoRequest(
        `https://api.brevo.com/v3/contacts/${encodedEmail}`,
        "PUT",
        apiKey,
        {
          attributes: initialPayload.attributes,
          listIds: initialPayload.listIds,
        }
      );
      response = updateResult.response;
      data = updateResult.data;
    }

    // 3. If STILL conflict (likely email/phone mismatch), try fallback without SMS
    if (!response.ok && looksLikeConflict(response.status, data)) {
      console.warn(`[Brevo] Persistent conflict for ${submission.email}, retrying without SMS...`);
      const fallbackPayload = withoutSms(initialPayload);

      // Try POST without SMS
      const fallbackPost = await brevoRequest(
        "https://api.brevo.com/v3/contacts",
        "POST",
        apiKey,
        fallbackPayload
      );

      if (fallbackPost.response.ok) {
        response = fallbackPost.response;
        data = fallbackPost.data;
      } else if (looksLikeConflict(fallbackPost.response.status, fallbackPost.data)) {
        // Try PUT without SMS
        const fallbackPut = await brevoRequest(
          `https://api.brevo.com/v3/contacts/${encodedEmail}`,
          "PUT",
          apiKey,
          {
            attributes: fallbackPayload.attributes,
            listIds: fallbackPayload.listIds,
          }
        );
        response = fallbackPut.response;
        data = fallbackPut.data;
      }
    }

    if (response.ok) {
      console.log(`[Brevo] Success for ${submission.email}`);
      return res.status(200).json({ message: "Support application submitted." });
    }

    // Handle specific errors for the user
    const msg = data.message?.toLowerCase() ?? "";
    if (response.status === 400 && msg.includes("invalid phone number")) {
      return res.status(400).json({
        error: "The phone number provided is invalid. Please use a standard format (e.g., +16135550199).",
      });
    }

    if (looksLikeConflict(response.status, data)) {
      return res.status(409).json({
        message: "Your application was received, but we found a conflict with the email or phone number provided. Please contact our team so we can help complete your application.",
        conflict: true,
      });
    }

    console.error(`[Brevo] Final failure for ${submission.email}:`, response.status, data);
    return res.status(response.status).json({
      error: data.message ?? "Brevo rejected the submission.",
    });

  } catch (error) {
    console.error("Brevo support submission failed:", error);
    return res.status(500).json({ error: "Unable to submit the support application." });
  }
}
