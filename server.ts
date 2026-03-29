import express from "express";
import { createServer as createViteServer } from "vite";

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

interface PartnerFormSubmission {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  organizationName?: string;
  role?: string;
  country?: string;
  ministryInterests: string[];
  availability: string;
  helpTypes: string[];
  involvementType: string;
  frequency: string;
  backgroundInfo: string;
  comments?: string;
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

function readPartnerListId() {
  const rawValue = process.env.BREVO_PARTNER_LIST_ID;
  if (!rawValue) return 9;
  const parsed = Number(rawValue);
  return Number.isInteger(parsed) ? parsed : 9;
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
  if (submission.pets.length > 0) {
    attributes.PET_INFO = submission.pets.map((pet) => pet.name).join(", ");
  }

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

function formatPhone(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  if (digits.length >= 11) return `+${digits}`;
  return null;
}

function buildPartnerBrevoPayload(
  submission: PartnerFormSubmission,
  listId: number = 9
): BrevoContactPayload {
  const formattedPhone = formatPhone(submission.phone);
  
  const attributes: Record<string, string | number | boolean> = {
    FIRSTNAME: submission.firstName.trim(),
    LASTNAME: submission.lastName.trim(),
    BACKGROUND_INFO: submission.backgroundInfo.trim(),
    AVAILABILITY: submission.availability.trim(),
    INVOLVEMENT_TYPE: submission.involvementType.trim(),
    FREQUENCY: submission.frequency.trim(),
  };

  if (formattedPhone) attributes.SMS = formattedPhone;
  if (submission.organizationName?.trim()) attributes.ORG_NAME = submission.organizationName.trim();
  if (submission.role?.trim()) attributes.ROLE = submission.role.trim();
  if (submission.country?.trim()) attributes.COUNTRY = submission.country.trim();
  if (submission.ministryInterests.length > 0) attributes.MINISTRY_INTERESTS = submission.ministryInterests.join(", ");
  if (submission.helpTypes.length > 0) attributes.HELP_TYPES = submission.helpTypes.join(", ");
  if (submission.comments?.trim()) attributes.COMMENTS = submission.comments.trim();

  return {
    email: submission.email.trim(),
    attributes,
    listIds: [listId],
    updateEnabled: true,
  };
}

function validateSubmission(submission: SupportFormSubmission) {
  if (!submission.firstName?.trim()) return "First name is required.";
  if (!submission.lastName?.trim()) return "Last name is required.";
  if (!submission.email?.trim()) return "Email is required.";
  if (!submission.postalCode?.trim()) return "Postal code is required.";
  return undefined;
}

function validatePartnerSubmission(submission: PartnerFormSubmission) {
  if (!submission.firstName?.trim()) return "First name is required.";
  if (!submission.lastName?.trim()) return "Last name is required.";
  if (!submission.email?.trim()) return "Email is required.";
  if (!submission.phone?.trim()) return "Phone number is required.";
  if (!submission.backgroundInfo?.trim()) return "Background information is required.";
  
  const formattedPhone = formatPhone(submission.phone);
  if (!formattedPhone) return "Please provide a valid phone number.";
  
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

function looksLikeConflict(status: number, payload: { message?: string; code?: string }) {
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

function withoutSms(payload: BrevoContactPayload): BrevoContactPayload {
  const attributes = { ...payload.attributes };
  delete attributes.SMS;
  return { ...payload, attributes };
}

async function brevoRequest(
  apiKey: string,
  method: "POST" | "PUT",
  url: string,
  body: Record<string, unknown>,
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

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT ?? 3000);

  app.use(express.json());

  app.post("/api/subscribe", async (req, res) => {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        status: "error",
        error: "BREVO_API_KEY is not configured.",
      });
    }

    try {
      const submission = req.body as SupportFormSubmission;
      const validationError = validateSubmission(submission);

      if (validationError) {
        return res.status(400).json({
          status: "error",
          error: validationError,
        });
      }

      const payload = buildBrevoPayload(submission, readListId());
      const email = encodeURIComponent(submission.email.trim());

      const createAttempt = await brevoRequest(
        apiKey,
        "POST",
        "https://api.brevo.com/v3/contacts",
        payload as any,
      );

      if (createAttempt.response.ok) {
        return res.status(200).json({
          status: "success",
          message: "Support application submitted.",
        });
      }

      const updateAttempt = await brevoRequest(
        apiKey,
        "PUT",
        `https://api.brevo.com/v3/contacts/${email}`,
        {
          attributes: payload.attributes,
          listIds: payload.listIds,
          emailBlacklisted: false,
          smsBlacklisted: false,
        },
      );

      if (updateAttempt.response.ok) {
        return res.status(200).json({
          status: "success",
          message: "Support application submitted.",
        });
      }

      if (
        looksLikeConflict(createAttempt.response.status, createAttempt.data) ||
        looksLikeConflict(updateAttempt.response.status, updateAttempt.data)
      ) {
        const payloadNoSms = withoutSms(payload);

        const createNoSmsAttempt = await brevoRequest(
          apiKey,
          "POST",
          "https://api.brevo.com/v3/contacts",
          payloadNoSms as any,
        );

        if (createNoSmsAttempt.response.ok) {
          return res.status(200).json({
            status: "warning",
            message:
              "Your application was submitted, but your phone number could not be synced. Our team can still review your request.",
          });
        }

        const updateNoSmsAttempt = await brevoRequest(
          apiKey,
          "PUT",
          `https://api.brevo.com/v3/contacts/${email}`,
          {
            attributes: payloadNoSms.attributes,
            listIds: payloadNoSms.listIds,
            emailBlacklisted: false,
            smsBlacklisted: false,
          },
        );

        if (updateNoSmsAttempt.response.ok) {
          return res.status(200).json({
            status: "warning",
            message:
              "Your application was submitted, but your phone number could not be synced. Our team can still review your request.",
          });
        }

        console.error("Brevo conflict remained after SMS fallback:", {
          create: {
            status: createAttempt.response.status,
            data: createAttempt.data,
          },
          update: {
            status: updateAttempt.response.status,
            data: updateAttempt.data,
          },
          createNoSms: {
            status: createNoSmsAttempt.response.status,
            data: createNoSmsAttempt.data,
          },
          updateNoSms: {
            status: updateNoSmsAttempt.response.status,
            data: updateNoSmsAttempt.data,
          },
        });

        return res.status(500).json({
          status: "error",
          error: "We could not save your application right now. Please review the email and phone number or try again shortly.",
        });
      }

      console.error("Brevo submission failed:", {
        create: {
          status: createAttempt.response.status,
          data: createAttempt.data,
        },
        update: {
          status: updateAttempt.response.status,
          data: updateAttempt.data,
        },
      });

      return res.status(500).json({
        status: "error",
        error: "We could not save your application right now. Please try again shortly.",
      });
    } catch (error) {
      console.error("Subscribe API fatal error:", error);
      return res.status(500).json({
        status: "error",
        error: "A server error occurred while submitting your application.",
      });
    }
  });

  app.post("/api/partner", async (req, res) => {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      return res.status(500).json({
        status: "error",
        error: "BREVO_API_KEY is not configured.",
      });
    }

    try {
      const submission = req.body as PartnerFormSubmission;
      const validationError = validatePartnerSubmission(submission);

      if (validationError) {
        return res.status(400).json({
          status: "error",
          error: validationError,
        });
      }

      const payload = buildPartnerBrevoPayload(submission, readPartnerListId());
      const email = encodeURIComponent(submission.email.trim());

      const createAttempt = await brevoRequest(
        apiKey,
        "POST",
        "https://api.brevo.com/v3/contacts",
        payload as any,
      );

      if (createAttempt.response.ok) {
        return res.status(200).json({
          status: "success",
          message: "Partnership form submitted.",
        });
      }

      const updateAttempt = await brevoRequest(
        apiKey,
        "PUT",
        `https://api.brevo.com/v3/contacts/${email}`,
        {
          attributes: payload.attributes,
          listIds: payload.listIds,
          emailBlacklisted: false,
          smsBlacklisted: false,
        },
      );

      if (updateAttempt.response.ok) {
        return res.status(200).json({
          status: "success",
          message: "Partnership form submitted.",
        });
      }

      if (
        looksLikeConflict(createAttempt.response.status, createAttempt.data) ||
        looksLikeConflict(updateAttempt.response.status, updateAttempt.data)
      ) {
        const payloadNoSms = withoutSms(payload);

        const createNoSmsAttempt = await brevoRequest(
          apiKey,
          "POST",
          "https://api.brevo.com/v3/contacts",
          payloadNoSms as any,
        );

        if (createNoSmsAttempt.response.ok) {
          return res.status(200).json({
            status: "warning",
            message:
              "Your application was submitted, but your phone number could not be synced. Our team can still review your request.",
          });
        }

        const updateNoSmsAttempt = await brevoRequest(
          apiKey,
          "PUT",
          `https://api.brevo.com/v3/contacts/${email}`,
          {
            attributes: payloadNoSms.attributes,
            listIds: payloadNoSms.listIds,
            emailBlacklisted: false,
            smsBlacklisted: false,
          },
        );

        if (updateNoSmsAttempt.response.ok) {
          return res.status(200).json({
            status: "warning",
            message:
              "Your application was submitted, but your phone number could not be synced. Our team can still review your request.",
          });
        }

        console.error("Brevo conflict remained after SMS fallback:", {
          create: {
            status: createAttempt.response.status,
            data: createAttempt.data,
          },
          update: {
            status: updateAttempt.response.status,
            data: updateAttempt.data,
          },
          createNoSms: {
            status: createNoSmsAttempt.response.status,
            data: createNoSmsAttempt.data,
          },
          updateNoSms: {
            status: updateNoSmsAttempt.response.status,
            data: updateNoSmsAttempt.data,
          },
        });

        return res.status(500).json({
          status: "error",
          error: "We could not save your application right now. Please review the email and phone number or try again shortly.",
        });
      }

      console.error("Brevo submission failed:", {
        create: {
          status: createAttempt.response.status,
          data: createAttempt.data,
        },
        update: {
          status: updateAttempt.response.status,
          data: updateAttempt.data,
        },
      });

      return res.status(500).json({
        status: "error",
        error: "We could not save your application right now. Please try again shortly.",
      });
    } catch (error) {
      console.error("Partner API fatal error:", error);
      return res.status(500).json({
        status: "error",
        error: "A server error occurred while submitting your application.",
      });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*all", (_req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer();
