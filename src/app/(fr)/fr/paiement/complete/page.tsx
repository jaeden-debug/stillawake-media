import type { Metadata } from "next";

import { CheckoutComplete } from "@/components/checkout-complete";

/** Voir la version anglaise : jamais indexée, jamais mise en cache. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Paiement",
  robots: { index: false, follow: false },
};

export default async function PaiementCompletePage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  return <CheckoutComplete sessionId={session_id} locale="fr" />;
}
