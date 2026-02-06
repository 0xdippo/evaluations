import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID;

export async function POST() {
  if (!APP_URL) {
    return NextResponse.json(
      { error: "NEXT_PUBLIC_APP_URL is not set" },
      { status: 500 }
    );
  }
  if (!STRIPE_PRICE_ID) {
    return NextResponse.json(
      { error: "STRIPE_PRICE_ID is not set" },
      { status: 500 }
    );
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_creation: "always",
      line_items: [
        {
          price: STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      success_url: `${APP_URL}/questionnaire?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${APP_URL}/services`,
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Failed to create checkout session" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("Checkout error:", e);
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Checkout failed" },
      { status: 500 }
    );
  }
}
