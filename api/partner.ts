export const config = {
  runtime: "nodejs",
};

export interface PartnerFormSubmission {
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
  const rawValue = process.env.BREVO_PARTNER_LIST_ID;
  if (!rawValue) return 9;
  const parsed = Number(rawValue);
  return Number.isInteger(parsed) ? parsed : 9;
}

export function formatPhone(phone: string): string | null {
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

function parseBody(body: unknown) {
  if (typeof body === "string") return JSON.parse(body) as PartnerFormSubmission;
  return (body ?? {}) as PartnerFormSubmission;
}

function validateSubmission(submission: PartnerFormSubmission) {
  if (!submission.firstName?.trim()) return "First name is required.";
  if (!submission.lastName?.trim()) return "Last name is required.";
  if (!submission.email?.trim()) return "Email is required.";
  if (!submission.phone?.trim()) return "Phone number is required.";
  if (!submission.backgroundInfo?.trim()) return "Background information is required.";
  
  const formattedPhone = formatPhone(submission.phone);
  if (!formattedPhone) return "Please provide a valid phone number.";
  
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

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, {
      status: "error",
      error: "Method not allowed.",
    });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return json(res, 500, {
      status: "error",
      error: "BREVO_API_KEY is not configured in Vercel.",
    });
  }

  try {
    const submission = parseBody(req.body);
    const validationError = validateSubmission(submission);

    if (validationError) {
      return json(res, 400, {
        status: "error",
        error: validationError,
      });
    }

    const payload = buildPartnerBrevoPayload(submission, readListId());
    const email = encodeURIComponent(submission.email.trim());

    const createAttempt = await brevoRequest(
      apiKey,
      "POST",
      "https://api.brevo.com/v3/contacts",
      payload as any,
    );

    if (createAttempt.response.ok) {
      return json(res, 200, {
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
      return json(res, 200, {
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
        return json(res, 200, {
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
        return json(res, 200, {
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

      return json(res, 500, {
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

    return json(res, 500, {
      status: "error",
      error: "We could not save your application right now. Please try again shortly.",
    });
  } catch (error) {
    console.error("Partner API fatal error:", error);
    return json(res, 500, {
      status: "error",
      error: "A server error occurred while submitting your application.",
    });
  }
}
