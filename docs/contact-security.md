# StillAwake Media contact security

Last verified: 2026-08-09

## Scope and inventory

The only public submission path is:

`/contact` → `POST /api/contact` → Resend

There is no Supabase, database, CRM, newsletter, webhook, or alternate inquiry write path in this repository.

## Production architecture

1. Vercel automatic system/DDoS mitigations.
2. Vercel WAF rule `Rate limit contact submissions` (`rule_rate_limit_contact_submissions_yJEQpj`):
   - Path equals `/api/contact`.
   - Method equals `POST`.
   - Fixed window: 10 requests per 600 seconds per source IP.
   - Exceeded action: deny for 15 minutes.
3. BotID Basic, initialized only for `POST /api/contact` in `src/instrumentation-client.ts` and verified server-side in `src/app/api/contact/route.ts`.
4. Exact Origin enforcement. Production accepts only `https://stillawakemedia.com`; `www` redirects to the apex, arbitrary Vercel deployment domains are not accepted, and Preview contact submissions are intentionally non-functional.
5. Exact JSON Content-Type and 16 KiB streaming request limit.
6. Strict flat schema, enum/email/length/control-character validation, Unicode normalization, and conservative URL-count screening.
7. Server-side honeypot rejection.
8. Form completion timing is telemetry only (`contact.timing_suspicious`) and does not reject fast legitimate users.
9. Plain-text Resend notification only after every preceding check passes.

Cloudflare Turnstile, Upstash Redis, distributed duplicate storage, and `CONTACT_SECURITY_HASH_KEY` are not used. Edge rate limiting supplies the important quota/flood control before the function, while the immediate client submission lock prevents accidental double clicks. A content-based distributed duplicate store was not worth a separate datastore for this low-volume form.

The project-wide Bot Protection managed ruleset is intentionally not enabled in Challenge mode. Targeted BotID protects the only sensitive POST without challenging public pages, SEO crawlers, portfolio visitors, or desired AI discovery. BotID Deep Analysis is also not required initially; Basic mode plus the WAF rule is the lowest-complexity strong baseline. Deep Analysis can later be enabled from Vercel Firewall if observed abuse justifies its per-check cost.

## Email safety and environment

Required production variables:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL`

`stillawakemedia.com` was verified in the existing Resend account. Production `CONTACT_FROM_EMAIL` is configured in Vercel as the sensitive value `StillAwake Media <contact@stillawakemedia.com>`.

Visitor input is never used as `From`. The validated visitor email is used only as `Reply-To`. Subject names are normalized, stripped of CR/LF again, and truncated. Notifications are plain text; provider errors and secrets are never returned to visitors.

## Structured events

- `contact.accepted`
- `contact.configuration_error`
- `contact.origin_rejected`
- `contact.validation_rejected`
- `contact.honeypot_rejected`
- `contact.timing_suspicious`
- `contact.bot_rejected`
- `contact.security_dependency_error`
- `contact.notification_failed`

Events include a request ID, reason where appropriate, elapsed milliseconds for timing telemetry, and accepted service. They do not include the name, email, message, raw IP, BotID material, Resend credential, or authorization headers. Rate-limited requests are visible in Vercel Firewall observability and normally never enter application logs.

## Deployment and production verification

Before deployment:

1. Confirm the WAF rule is active and system mitigations are active.
2. Confirm all three production email variables exist.
3. Run `npm run typecheck`, `npm run lint`, `npm test`, `npm run build`, `npm audit --omit=dev`, and `git diff --check`.

After deployment:

1. Confirm `/contact` loads and remains usable on a narrow viewport.
2. Send one controlled legitimate inquiry and confirm exactly one notification, branded `From`, and safe `Reply-To`.
3. Confirm direct requests with a populated honeypot, foreign Origin, malformed JSON, wrong Content-Type, invalid email, or oversized body fail without email.
4. Confirm a direct POST without BotID browser proof is rejected.
5. Send only enough harmless rejected POSTs to verify the WAF eventually returns 429; do not flood production.
6. Confirm ordinary GET requests and public crawlers are unaffected.

## Remaining risks

No anti-bot system eliminates all spam. A human-assisted or sophisticated distributed bot might pass BotID and stay below per-IP limits. The endpoint-wide volumetric layer is Vercel's automatic DDoS mitigation rather than a content-aware global submission counter. There is no distributed content-duplicate store, by design. Monitor Vercel Firewall events and the PII-minimized application events; enable BotID Deep Analysis or tune the WAF only if real traffic supports the change.
