/**
 * Contact reasons, in the order a visitor should meet them.
 *
 * General inquiry and Support come first because this form is for talking
 * to us — anything that is actually a project gets pointed at the Studio
 * onboarding questionnaire, which collects far more than a message box can.
 * Values are canonical English and stored as-is; French display labels live
 * in SERVICE_LABELS_FR so validation never depends on the visitor's locale.
 */
export const CONTACT_SERVICES = [
  "General inquiry",
  "Support",
  "Website",
  "SEO",
  "Branding",
  "AI automation",
  "Software/App",
  "Shopify",
] as const;

export type ContactService = (typeof CONTACT_SERVICES)[number];

/** The two reasons that are conversations, not projects. */
export const NON_PROJECT_SERVICES: readonly ContactService[] = [
  "General inquiry",
  "Support",
];

/**
 * True when the visitor picked a real service — the signal that decides
 * which confirmation email they get and whether they enter the onboarding
 * follow-up sequence.
 */
export function isProjectService(service: string): boolean {
  return (
    CONTACT_SERVICES.includes(service as ContactService) &&
    !NON_PROJECT_SERVICES.includes(service as ContactService)
  );
}

/**
 * How they found us, asked at first contact.
 *
 * Studio asks the same question, but only people who finish onboarding
 * ever answer it — the group we already know most about. Asking here
 * covers everyone. Values match Studio's keys so the two can be counted
 * together.
 */
export const REFERRAL_SOURCES = [
  "referral",
  "google",
  "ai",
  "instagram",
  "tiktok",
  "linkedin",
  "facebook",
  "past_client",
  "saw_work",
  "other",
] as const;

export type ReferralSource = (typeof REFERRAL_SOURCES)[number];

export const REFERRAL_LABELS_EN: Record<ReferralSource, string> = {
  referral: "Someone referred me",
  google: "Google / search",
  ai: "ChatGPT / an AI assistant",
  instagram: "Instagram",
  tiktok: "TikTok",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  past_client: "We've worked together before",
  saw_work: "I saw something you built",
  other: "Somewhere else",
};

export const REFERRAL_LABELS_FR: Record<ReferralSource, string> = {
  referral: "Quelqu'un m'a référé",
  google: "Google / recherche",
  ai: "ChatGPT / un assistant IA",
  instagram: "Instagram",
  tiktok: "TikTok",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  past_client: "On a déjà travaillé ensemble",
  saw_work: "J'ai vu quelque chose que vous avez bâti",
  other: "Ailleurs",
};

export const SERVICE_LABELS_FR: Record<ContactService, string> = {
  "General inquiry": "Demande générale",
  Support: "Soutien technique",
  Website: "Site web",
  SEO: "SEO",
  Branding: "Image de marque",
  "AI automation": "Automatisation IA",
  "Software/App": "Logiciel / application",
  Shopify: "Shopify",
};

export type ContactSubmission = {
  name: string;
  email: string;
  service: ContactService;
  message: string;
  /** Honeypot — a real submission always leaves this empty. */
  projectReference: string;
  formStartedAt: number;
  /** Which site the form was submitted from, so replies match. */
  locale: "en" | "fr";
  /** How they found us. Optional — never block an enquiry over analytics. */
  referralSource: ReferralSource | "";
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
  "locale",
  "referralSource",
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

  const { name, email, service, message, projectReference, formStartedAt, locale, referralSource } =
    input;

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

  // Absent or unrecognised locale falls back to English rather than failing:
  // a missing display preference must never cost us an enquiry.
  const normalizedLocale = locale === "fr" ? "fr" : "en";
  // Attribution is nice to have, never a gate: an unrecognised or absent
  // value becomes empty rather than rejecting the enquiry.
  const normalizedReferral = REFERRAL_SOURCES.includes(referralSource as ReferralSource)
    ? (referralSource as ReferralSource)
    : "";

  return {
    success: true,
    data: {
      name: normalizedName,
      email: normalizedEmail,
      service: service as ContactService,
      message: normalizedMessage,
      projectReference: normalizedReference,
      formStartedAt,
      locale: normalizedLocale,
      referralSource: normalizedReferral,
    },
  };
}
