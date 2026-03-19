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

  const phone = cleanText(submission.phone);
  if (phone) attributes.SMS = phone;
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

function parseBody(body: unknown) {
  if (typeof body === "string") return JSON.parse(body) as SupportFormSubmission;
  return (body ?? {}) as SupportFormSubmission;
}

function validateSubmission(submission: SupportFormSubmission) {
  if (!submission.firstName?.trim()) return "First name is required.";
  if (!submission.lastName?.trim()) return "Last name is required.";
  if (!submission.email?.trim()) return "Email is required.";
  if (!submission.postalCode?.trim()) return "Postal code is required.";
  return undefined;
}

function json(res: any, status: number, body: Record<string, unknown>) {
  res.status(status);
  res.setHeader("Content-Type", "application/json");
  return res.send(JSON.stringify(body));
}

function parseBrevoText(text: string): { message?: string; code?: string; [key: string]: unknown } {
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
}

function isConflict(status: number, payload: { message?: string; code?: string }) {
  const text = `${payload.code ?? ""} ${payload.message ?? ""}`.toLowerCase();
  return (
    status === 400 ||
    status === 404 ||
    status === 409 ||
    text.includes("duplicate") ||
    text.includes("already exists") ||
    text.includes("conflict") ||
    text.includes("sms") ||
    text.includes("phone")
  );
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { error: "Method not allowed." });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return json(res, 500, { error: "BREVO_API_KEY is not configured in Vercel." });
  }

  try {
    const submission = parseBody(req.body);
    const validationError = validateSubmission(submission);

    if (validationError) {
      return json(res, 400, { error: validationError });
    }

    const payload = buildBrevoPayload(submission, readListId());

    const createResponse = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        ...payload,
        updateEnabled: true,
      }),
    });

    if (createResponse.ok) {
      return json(res, 200, { message: "Support application submitted." });
    }

    const createText = await createResponse.text();
    const createResult = parseBrevoText(createText);
    const encodedEmail = encodeURIComponent(submission.email.trim());

    if (isConflict(createResponse.status, createResult)) {
      const updateResponse = await fetch(`https://api.brevo.com/v3/contacts/${encodedEmail}`, {
        method: "PUT",
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          attributes: payload.attributes,
          listIds: payload.listIds,
          emailBlacklisted: false,
          smsBlacklisted: false,
        }),
      });

      if (updateResponse.ok) {
        return json(res, 200, { message: "Support application submitted." });
      }

      const updateText = await updateResponse.text();
      const updateResult = parseBrevoText(updateText);

      if (isConflict(updateResponse.status, updateResult)) {
        return json(res, 200, {
          message:
            "Your application was received, but we found an existing contact conflict with the email or phone number provided. Please contact our team so we can help complete your application.",
          conflict: true,
        });
      }

      console.error("Brevo update failed:", updateResponse.status, updateResult);
      return json(res, 500, {
        error: "We could not save your application right now. Please try again shortly.",
      });
    }

    console.error("Brevo create failed:", createResponse.status, createResult);
    return json(res, 500, {
      error: createResult.message ?? "We could not save your application right now. Please try again shortly.",
    });
  } catch (error) {
    console.error("Subscribe API fatal error:", error);
    return json(res, 500, {
      error: "A server error occurred while submitting your application.",
    });
  }
}
