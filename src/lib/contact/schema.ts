export const CONTACT_SERVICES = [
  "Website",
  "SEO",
  "Branding",
  "AI automation",
  "Software/App",
  "Shopify",
] as const;

export type ContactService = (typeof CONTACT_SERVICES)[number];

export type ContactSubmission = {
  name: string;
  email: string;
  service: ContactService;
  message: string;
  projectReference: string;
  formStartedAt: number;
};

type ValidationResult =
  | { success: true; data: ContactSubmission }
  | { success: false; reason: string };

const ALLOWED_FIELDS = new Set([
  "name",
  "email",
  "service",
  "message",
  "projectReference",
  "formStartedAt",
]);
const UNSAFE_CONTROL_CHARACTERS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u;
const URL_PATTERN = /(?:https?:\/\/|www\.)/giu;

function normalizeSingleLine(value: string) {
  return value.normalize("NFC").trim().replace(/\s+/gu, " ");
}

function normalizeMessage(value: string) {
  return value.normalize("NFC").replace(/\r\n?/gu, "\n").trim();
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

export function validateContactSubmission(input: unknown): ValidationResult {
  if (!isPlainObject(input)) return { success: false, reason: "invalid_body" };
  if (Object.keys(input).some((key) => !ALLOWED_FIELDS.has(key))) {
    return { success: false, reason: "unexpected_field" };
  }

  const { name, email, service, message, projectReference, formStartedAt } = input;

  if (typeof name !== "string") return { success: false, reason: "invalid_name" };
  if (typeof email !== "string") return { success: false, reason: "invalid_email" };
  if (typeof service !== "string") return { success: false, reason: "invalid_service" };
  if (typeof message !== "string") return { success: false, reason: "invalid_message" };
  if (typeof projectReference !== "string") {
    return { success: false, reason: "invalid_project_reference" };
  }
  if (typeof formStartedAt !== "number" || !Number.isSafeInteger(formStartedAt)) {
    return { success: false, reason: "invalid_timing" };
  }

  const normalizedName = normalizeSingleLine(name);
  const normalizedEmail = email.normalize("NFC").trim().toLowerCase();
  const normalizedMessage = normalizeMessage(message);
  const normalizedReference = projectReference.normalize("NFC").trim();

  if (!normalizedName || normalizedName.length > 100 || UNSAFE_CONTROL_CHARACTERS.test(normalizedName)) {
    return { success: false, reason: "invalid_name" };
  }
  if (
    !normalizedEmail ||
    normalizedEmail.length > 254 ||
    !EMAIL_PATTERN.test(normalizedEmail) ||
    UNSAFE_CONTROL_CHARACTERS.test(normalizedEmail)
  ) {
    return { success: false, reason: "invalid_email" };
  }
  if (!CONTACT_SERVICES.includes(service as ContactService)) {
    return { success: false, reason: "invalid_service" };
  }
  if (!normalizedMessage || normalizedMessage.length > 5_000 || UNSAFE_CONTROL_CHARACTERS.test(normalizedMessage)) {
    return { success: false, reason: "invalid_message" };
  }
  if (normalizedReference.length > 200 || UNSAFE_CONTROL_CHARACTERS.test(normalizedReference)) {
    return { success: false, reason: "invalid_project_reference" };
  }
  if ((normalizedMessage.match(URL_PATTERN) ?? []).length > 3) {
    return { success: false, reason: "excessive_urls" };
  }

  return {
    success: true,
    data: {
      name: normalizedName,
      email: normalizedEmail,
      service: service as ContactService,
      message: normalizedMessage,
      projectReference: normalizedReference,
      formStartedAt,
    },
  };
}
