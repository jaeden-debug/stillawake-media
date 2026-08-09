export type ContactRuntimeConfig = {
  requireProductionConfig: boolean;
  allowMissingOrigin: boolean;
  allowedOrigins: Set<string>;
  resendApiKey?: string;
  fromEmail?: string;
  toEmail?: string;
};

export function loadContactRuntimeConfig(env: NodeJS.ProcessEnv = process.env): ContactRuntimeConfig {
  const isLocalDevelopment = env.NODE_ENV !== "production";
  const allowedOrigins = new Set(["https://stillawakemedia.com"]);

  if (isLocalDevelopment) {
    allowedOrigins.add("http://localhost:3000");
    allowedOrigins.add("http://127.0.0.1:3000");
  }

  return {
    requireProductionConfig: env.VERCEL_ENV === "production",
    allowMissingOrigin: isLocalDevelopment,
    allowedOrigins,
    resendApiKey: env.RESEND_API_KEY,
    fromEmail: env.CONTACT_FROM_EMAIL,
    toEmail: env.CONTACT_TO_EMAIL,
  };
}

function normalizeOrigin(value: string) {
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" && url.protocol !== "http:") return undefined;
    return url.origin;
  } catch {
    return undefined;
  }
}

export function getMissingProductionConfig(config: ContactRuntimeConfig) {
  if (!config.requireProductionConfig) return [];
  return [
    ["RESEND_API_KEY", config.resendApiKey],
    ["CONTACT_FROM_EMAIL", config.fromEmail],
    ["CONTACT_TO_EMAIL", config.toEmail],
  ].filter(([, value]) => !value).map(([name]) => name);
}

export function isAllowedOrigin(request: Request, config: ContactRuntimeConfig) {
  const origin = request.headers.get("origin");
  if (!origin) return config.allowMissingOrigin;
  const normalized = normalizeOrigin(origin);
  return normalized !== undefined && config.allowedOrigins.has(normalized);
}
