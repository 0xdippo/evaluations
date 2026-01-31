"use server";

import Stripe from "stripe";

export type VerifyResult =
  | { ok: true }
  | { ok: false; reason: "missing_key" | "invalid_session" | "not_paid" };

export async function verifyCheckoutSession(
  sessionId: string
): Promise<VerifyResult> {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return { ok: false, reason: "missing_key" };
  }
  try {
    const stripe = new Stripe(key);
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === "paid") {
      return { ok: true };
    }
    return { ok: false, reason: "not_paid" };
  } catch {
    return { ok: false, reason: "invalid_session" };
  }
}
