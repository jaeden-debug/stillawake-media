import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase client for the published CMS surface. Server-side use only.
 *
 * The publishable key can see nothing except the `cms_public_*` views
 * (base tables are deny-all), so this client is read-only by construction.
 * Returns null when env is absent (e.g. a build machine without secrets) —
 * every caller must treat a null client as "CMS unavailable", not an error.
 */
let cached: SupabaseClient | null = null;

export function getCmsClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  if (!cached) {
    cached = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return cached;
}
