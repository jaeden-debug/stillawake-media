import { describe, expect, it, vi } from "vitest";
import {
  handleContactRequest,
  methodNotAllowedResponse,
  type ContactHandlerDependencies,
} from "./handler";
import type { ContactRuntimeConfig } from "./security";
import type { ContactSubmission } from "./schema";

const NOW = 1_800_000_000_000;

const productionConfig: ContactRuntimeConfig = {
  requireProductionConfig: true,
  allowMissingOrigin: false,
  allowedOrigins: new Set(["https://stillawakemedia.com"]),
  resendApiKey: "resend-key",
  fromEmail: "StillAwake Media <contact@stillawakemedia.com>",
  toEmail: "inbox@stillawakemedia.com",
};

function validBody(overrides: Record<string, unknown> = {}) {
  return {
    name: "Élodie Tremblay",
    email: "elodie@example.com",
    service: "Website",
    message: "Bonjour, j’aimerais discuter d’un nouveau site pour mon entreprise.",
    projectReference: "",
    formStartedAt: NOW - 2_000,
    ...overrides,
  };
}

function makeRequest(body: unknown = validBody(), headers: Record<string, string> = {}) {
  return new Request("https://stillawakemedia.com/api/contact", {
    method: "POST",
    headers: {
      Origin: "https://stillawakemedia.com",
      "Content-Type": "application/json",
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

function makeDependencies(overrides: Partial<ContactHandlerDependencies> = {}) {
  const sendNotification = vi.fn<(submission: ContactSubmission) => Promise<void>>().mockResolvedValue();
  const log = vi.fn();
  const dependencies: ContactHandlerDependencies = {
    config: productionConfig,
    now: () => NOW,
    checkBot: vi.fn(async () => true),
    sendNotification,
    log,
    ...overrides,
  };
  return { dependencies, sendNotification, log };
}

async function submit(body: unknown = validBody(), overrides: Partial<ContactHandlerDependencies> = {}) {
  const { dependencies, sendNotification, log } = makeDependencies(overrides);
  const response = await handleContactRequest(makeRequest(body), dependencies);
  return { response, sendNotification, log };
}

describe("contact security gateway", () => {
  it("accepts one legitimate Unicode/French inquiry and sends exactly one notification", async () => {
    const { response, sendNotification } = await submit();
    expect(response.status).toBe(200);
    expect(sendNotification).toHaveBeenCalledTimes(1);
    expect(sendNotification).toHaveBeenCalledWith(expect.objectContaining({
      name: "Élodie Tremblay",
      message: expect.stringContaining("j’aimerais"),
    }));
  });

  it.each([
    ["missing name", { name: undefined }],
    ["missing email", { email: undefined }],
    ["malformed email", { email: "not-an-email" }],
    ["missing message", { message: undefined }],
    ["invalid service", { service: "Anything" }],
    ["oversized name", { name: "A".repeat(101) }],
    ["oversized message", { message: "A".repeat(5_001) }],
    ["unexpected nested field", { metadata: { admin: true } }],
    ["URL-heavy spam", { message: "https://a.test https://b.test https://c.test https://d.test" }],
  ])("rejects %s before BotID and notification", async (_label, override) => {
    const checkBot = vi.fn(async () => true);
    const { response, sendNotification } = await submit(validBody(override), { checkBot });
    expect(response.status).toBe(400);
    expect(checkBot).not.toHaveBeenCalled();
    expect(sendNotification).not.toHaveBeenCalled();
  });

  it("rejects a populated honeypot before BotID or notification", async () => {
    const checkBot = vi.fn(async () => true);
    const { response, sendNotification } = await submit(
      validBody({ projectReference: "https://bot.example" }),
      { checkBot },
    );
    expect(response.status).toBe(400);
    expect(checkBot).not.toHaveBeenCalled();
    expect(sendNotification).not.toHaveBeenCalled();
  });

  it("logs impossible timing as suspicion without blocking a legitimate request", async () => {
    const { response, sendNotification, log } = await submit(validBody({ formStartedAt: NOW - 100 }));
    expect(response.status).toBe(200);
    expect(sendNotification).toHaveBeenCalledTimes(1);
    expect(log).toHaveBeenCalledWith("warn", expect.objectContaining({
      event: "contact.timing_suspicious",
    }));
  });

  it("rejects a BotID-classified bot before notification", async () => {
    const { response, sendNotification } = await submit(validBody(), {
      checkBot: vi.fn(async () => false),
    });
    expect(response.status).toBe(403);
    expect(sendNotification).not.toHaveBeenCalled();
  });

  it("fails closed if BotID cannot make a decision", async () => {
    const { response, sendNotification } = await submit(validBody(), {
      checkBot: vi.fn(async () => { throw new Error("BotID unavailable"); }),
    });
    expect(response.status).toBe(503);
    expect(sendNotification).not.toHaveBeenCalled();
  });

  it("returns a controlled error for malformed JSON", async () => {
    const { dependencies, sendNotification } = makeDependencies();
    const response = await handleContactRequest(makeRequest("{"), dependencies);
    expect(response.status).toBe(400);
    expect(sendNotification).not.toHaveBeenCalled();
  });

  it("rejects an oversized request body", async () => {
    const { dependencies, sendNotification } = makeDependencies();
    const response = await handleContactRequest(makeRequest(`{"padding":"${"x".repeat(17_000)}"}`), dependencies);
    expect(response.status).toBe(413);
    expect(sendNotification).not.toHaveBeenCalled();
  });

  it("rejects an inappropriate Content-Type", async () => {
    const { dependencies, sendNotification } = makeDependencies();
    const response = await handleContactRequest(makeRequest(validBody(), { "Content-Type": "text/plain" }), dependencies);
    expect(response.status).toBe(415);
    expect(sendNotification).not.toHaveBeenCalled();
  });

  it("rejects foreign and missing production Origins", async () => {
    const { dependencies, sendNotification } = makeDependencies();
    const foreign = await handleContactRequest(
      makeRequest(validBody(), { Origin: "https://evil.example" }),
      dependencies,
    );
    expect(foreign.status).toBe(403);

    const missingOriginRequest = new Request("https://stillawakemedia.com/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validBody()),
    });
    const missing = await handleContactRequest(missingOriginRequest, dependencies);
    expect(missing.status).toBe(403);
    expect(sendNotification).not.toHaveBeenCalled();
  });

  it("does not authorize www because production redirects it to the apex", async () => {
    const { dependencies, sendNotification } = makeDependencies();
    const response = await handleContactRequest(
      makeRequest(validBody(), { Origin: "https://www.stillawakemedia.com" }),
      dependencies,
    );
    expect(response.status).toBe(403);
    expect(sendNotification).not.toHaveBeenCalled();
  });

  it("passes HTML/script content only to the plain-text notification path", async () => {
    const { response, sendNotification } = await submit(validBody({
      message: "Please review <script>alert('xss')</script> as literal sample code.",
    }));
    expect(response.status).toBe(200);
    expect(sendNotification).toHaveBeenCalledWith(expect.objectContaining({
      message: expect.stringContaining("<script>"),
    }));
  });

  it("normalizes name newlines and rejects email header injection", async () => {
    const normalized = await submit(validBody({ name: "Jane\r\nBcc: victim@example.com" }));
    expect(normalized.response.status).toBe(200);
    expect(normalized.sendNotification).toHaveBeenCalledWith(expect.objectContaining({
      name: "Jane Bcc: victim@example.com",
    }));

    const injected = await submit(validBody({ email: "sender@example.com\r\nBcc: victim@example.com" }));
    expect(injected.response.status).toBe(400);
    expect(injected.sendNotification).not.toHaveBeenCalled();
  });

  it("applies BotID and all validation to a direct POST", async () => {
    const checkBot = vi.fn(async () => false);
    const { response, sendNotification } = await submit(validBody(), { checkBot });
    expect(response.status).toBe(403);
    expect(checkBot).toHaveBeenCalledTimes(1);
    expect(sendNotification).not.toHaveBeenCalled();
  });

  it("returns a controlled notification failure without leaking provider details", async () => {
    const { response } = await submit(validBody(), {
      sendNotification: vi.fn(async () => { throw new Error("secret Resend detail"); }),
    });
    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({
      error: "Message failed to send. Please try again later.",
    });
  });

  it("fails closed before notification when production email configuration is incomplete", async () => {
    const { response, sendNotification } = await submit(validBody(), {
      config: { ...productionConfig, fromEmail: undefined },
    });
    expect(response.status).toBe(503);
    expect(sendNotification).not.toHaveBeenCalled();
  });

  it("returns a controlled 405 for unsupported methods", async () => {
    const response = methodNotAllowedResponse();
    expect(response.status).toBe(405);
    expect(response.headers.get("allow")).toBe("POST");
  });
});
