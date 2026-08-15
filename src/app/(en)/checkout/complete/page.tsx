import type { Metadata } from "next";

import { CheckoutComplete } from "@/components/checkout-complete";

/**
 * Return URL for Stripe Checkout. Never indexed and never cached: it renders a
 * specific person's payment status, and a cached copy would show one buyer's
 * outcome to the next.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

export default async function CheckoutCompletePage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  return <CheckoutComplete sessionId={session_id} locale="en" />;
}
