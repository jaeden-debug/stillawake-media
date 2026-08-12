/**
 * Content-layer slot helper (§75–76).
 *
 * A content_layer row publishes a flat Record<string, string> of PLAIN TEXT
 * slots for a bespoke code-owned page. Pages render slot values with normal
 * JSX `{}` interpolation only — never dangerouslySetInnerHTML — so a slot can
 * never inject markup. The code literal stays in the page as the fallback:
 * with no published layer the page renders byte-identically to before.
 */
export function slot(
  slots: Record<string, string> | null | undefined,
  key: string,
  fallback: string,
): string {
  return slots?.[key] ?? fallback;
}
