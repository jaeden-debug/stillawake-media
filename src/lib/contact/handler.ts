import { randomUUID } from "node:crypto";
import { validateContactSubmission, type ContactSubmission } from "./schema";
import {
  getMissingProductionConfig,
  isAllowedOrigin,
  type ContactRuntimeConfig,
} from "./security";

const MAX_BODY_BYTES = 16_384;
const SUSPICIOUS_FORM_TIME_MS = 800;

export type ContactHandlerDependencies = {
  config: ContactRuntimeConfig;
  now?: () => number;
  checkBot: () => Promise<boolean>;
  sendNotification: (submission: ContactSubmission) => Promise<void>;
  log?: (level: "info" | "warn" | "error", event: Record<string, unknown>) => void;
};

class RequestBodyError extends Error {
  constructor(readonly reason: "body_too_large" | "malformed_json") {
    super(reason);
  }
}

async function readJsonBody(request: Request) {
  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    throw new RequestBodyError("body_too_large");
  }
  if (!request.body) throw new RequestBodyError("malformed_json");

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_BODY_BYTES) {
      await reader.cancel();
      throw new RequestBodyError("body_too_large");
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  try {
    return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)) as unknown;
  } catch {
    throw new RequestBodyError("malformed_json");
  }
}

function response(body: Record<string, unknown>, status: number, extraHeaders?: HeadersInit) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      ...extraHeaders,
    },
  });
}

function defaultLogger(level: "info" | "warn" | "error", event: Record<string, unknown>) {
  const line = JSON.stringify(event);
  if (level === "error") console.error(line);
  else if (level === "warn") console.warn(line);
  else console.info(line);
}

export async function handleContactRequest(request: Request, dependencies: ContactHandlerDependencies) {
  const requestId = randomUUID();
  const now = dependencies.now ?? Date.now;
  const log = dependencies.log ?? defaultLogger;
  const emit = (level: "info" | "warn" | "error", event: string, details: Record<string, unknown> = {}) =>
    log(level, { event, requestId, ...details });

  const missingConfig = getMissingProductionConfig(dependencies.config);
  if (missingConfig.length > 0) {
    emit("error", "contact.configuration_error", { missing: missingConfig });
    return response({ error: "The form is temporarily unavailable. Please try again later." }, 503);
  }

  if (!isAllowedOrigin(request, dependencies.config)) {
    emit("warn", "contact.origin_rejected");
    return response({ error: "Unable to submit the form." }, 403);
  }

  const contentType = request.headers.get("content-type")?.split(";", 1)[0]?.trim().toLowerCase();
  if (contentType !== "application/json") {
    emit("warn", "contact.validation_rejected", { reason: "invalid_content_type" });
    return response({ error: "Unable to submit the form." }, 415);
  }

  let input: unknown;
  try {
    input = await readJsonBody(request);
  } catch (error) {
    const reason = error instanceof RequestBodyError ? error.reason : "malformed_json";
    emit("warn", "contact.validation_rejected", { reason });
    return response({ error: "Unable to submit the form." }, reason === "body_too_large" ? 413 : 400);
  }

  const parsed = validateContactSubmission(input);
  if (!parsed.success) {
    emit("warn", "contact.validation_rejected", { reason: parsed.reason });
    return response({ error: "Please check the form and try again." }, 400);
  }

  if (parsed.data.projectReference) {
    emit("warn", "contact.honeypot_rejected");
    return response({ error: "Unable to submit the form." }, 400);
  }

  const elapsed = now() - parsed.data.formStartedAt;
  if (elapsed < SUSPICIOUS_FORM_TIME_MS || parsed.data.formStartedAt > now() + 5_000) {
    emit("warn", "contact.timing_suspicious", { elapsedMs: elapsed });
  }

  try {
    if (!(await dependencies.checkBot())) {
      emit("warn", "contact.bot_rejected");
      return response({ error: "Unable to submit the form." }, 403);
    }
  } catch {
    emit("error", "contact.security_dependency_error", { dependency: "botid" });
    return response({ error: "The form is temporarily unavailable. Please try again later." }, 503);
  }

  try {
    await dependencies.sendNotification(parsed.data);
  } catch {
    emit("error", "contact.notification_failed");
    return response({ error: "Message failed to send. Please try again later." }, 502);
  }

  emit("info", "contact.accepted", { service: parsed.data.service });
  return response({ ok: true }, 200);
}

export function methodNotAllowedResponse() {
  return response({ error: "Method not allowed." }, 405, { Allow: "POST" });
}
