import express from "express";
import { createServer as createViteServer } from "vite";
import { buildBrevoPayload, type SupportFormSubmission } from "./src/lib/supportSubmission";

function readListId() {
  const rawValue = process.env.BREVO_LIST_ID ?? process.env.BREVO_SUPPORT_LIST_ID;
  if (!rawValue) return undefined;
  const parsed = Number(rawValue);
  return Number.isInteger(parsed) ? parsed : undefined;
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

function parseBrevoResponse(responseText: string): { message?: string; [key: string]: unknown } {
  if (!responseText) return {};
  try {
    return JSON.parse(responseText);
  } catch {
    return { message: responseText };
  }
}

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT ?? 3000);

  app.use(express.json());

  app.post("/api/subscribe", async (req, res) => {
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
        console.log(`[Brevo] Contact created/updated: ${submission.email}`);
        return res.status(200).json({ message: "Support application submitted." });
      }

      const createText = await createResponse.text();
      const createResult = parseBrevoResponse(createText);
      const encodedEmail = encodeURIComponent(submission.email.trim());

      if (isConflict(createResponse.status, createResult)) {
        console.warn(`[Brevo] Conflict detected for ${submission.email}, attempting update...`);
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
          console.log(`[Brevo] Contact updated via PUT: ${submission.email}`);
          return res.status(200).json({ message: "Support application submitted." });
        }

        const updateText = await updateResponse.text();
        const updateResult = parseBrevoResponse(updateText);

        if (isConflict(updateResponse.status, updateResult)) {
          console.error(`[Brevo] Persistent conflict for ${submission.email}:`, updateResult);
          return res.status(409).json({
            message:
              "Your application was received, but we found an existing contact conflict with the email or phone number provided. Please contact our team so we can help complete your application.",
            conflict: true,
          });
        }

        console.error(`[Brevo] Update failed: ${updateResponse.status}`, updateResult);
        return res.status(500).json({
          error: "We could not save your application right now. Please try again shortly.",
        });
      }

      const isInvalidPhone =
        createResponse.status === 400 &&
        createResult.message?.toLowerCase().includes("invalid phone number");

      if (isInvalidPhone) {
        return res.status(400).json({
          error: "The phone number provided is invalid. Please use a standard 10-digit format (e.g., 613-555-0199).",
        });
      }

      console.error(`[Brevo] Create failed: ${createResponse.status}`, createResult);
      return res.status(createResponse.status).json({
        error: createResult.message ?? "Brevo rejected the submission.",
      });
    } catch (error) {
      console.error("Brevo support submission failed:", error);
      return res.status(500).json({ error: "Unable to submit the support application." });
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
    app.get("*", (_req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer();
