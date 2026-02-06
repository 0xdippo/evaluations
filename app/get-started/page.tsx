import { verifyCheckoutSession } from "@/app/actions/stripe";
import { GetStartedClient } from "./GetStartedClient";
import { PaymentRequiredFallback } from "./PaymentRequiredFallback";
import { Button } from "@/components/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started | Campbell Football Evaluations",
  description: "Complete your evaluation questionnaire after purchase.",
};

// Always read searchParams from the request (no static caching)
export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ session_id?: string }>;
};

const BYPASS_STRIPE =
  process.env.NEXT_PUBLIC_BYPASS_STRIPE_GET_STARTED === "true";

export default async function GetStartedPage({ searchParams }: Props) {
  const { session_id } = await searchParams;

  // For local testing: show questionnaire without a Stripe session
  if (!session_id) {
    if (BYPASS_STRIPE) {
      return (
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
          <h1 className="text-2xl font-semibold text-navy">Get Started</h1>
          <p className="mt-2 text-text-muted">
            Complete the questionnaire below. Your evaluation will be delivered
            within 3 business days.
          </p>
          <p className="mt-2 text-sm text-gold">
            (Test mode - Stripe bypass enabled)
          </p>
          <GetStartedClient sessionId="test-bypass-no-stripe" />
        </div>
      );
    }
    return (
      <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 sm:py-16 text-center">
        <h1 className="text-2xl font-semibold text-navy">
          Payment required
        </h1>
        <p className="mt-4 text-text-muted">
          Complete your purchase to access the questionnaire.
        </p>
        <PaymentRequiredFallback />
        <div className="mt-8">
          <Button href="/services">Go to Services</Button>
        </div>
      </div>
    );
  }

  const result = BYPASS_STRIPE
    ? { ok: true as const }
    : await verifyCheckoutSession(session_id);

  if (!result.ok) {
    if (result.reason === "not_paid") {
      return (
        <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 sm:py-16 text-center">
          <h1 className="text-2xl font-semibold text-navy">
            Payment not completed
          </h1>
          <p className="mt-4 text-text-muted">
            Your payment was not completed. Please complete purchase to access
            the questionnaire.
          </p>
          <div className="mt-8">
            <Button href="/services">Go to Services</Button>
          </div>
        </div>
      );
    }
    if (result.reason === "invalid_session") {
      return (
        <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 sm:py-16 text-center">
          <h1 className="text-2xl font-semibold text-navy">
            Invalid session
          </h1>
          <p className="mt-4 text-text-muted">
            This link is invalid or expired. Please purchase from the Services
            page.
          </p>
          <div className="mt-8">
            <Button href="/services">Go to Services</Button>
          </div>
        </div>
      );
    }
    return (
      <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 sm:py-16 text-center">
        <h1 className="text-2xl font-semibold text-navy">
          Configuration error
        </h1>
        <p className="mt-4 text-text-muted">
          Payment verification is not configured. Please contact support.
        </p>
        <div className="mt-8">
          <Button href="/services">Go to Services</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-2xl font-semibold text-navy">Get Started</h1>
      <p className="mt-2 text-text-muted">
        Complete the questionnaire below. Your evaluation will be delivered
        within 3 business days.
      </p>
      <GetStartedClient sessionId={session_id} />
    </div>
  );
}
