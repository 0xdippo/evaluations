import { getStripe } from "@/lib/stripe";
import { QuestionnaireForm } from "./QuestionnaireForm";
import { Button } from "@/components/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Questionnaire | Campbell Football Evaluations",
  description: "Complete your evaluation questionnaire after purchase.",
};

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ session_id?: string }>;
};

export default async function QuestionnairePage({ searchParams }: Props) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 sm:py-16 text-center">
        <h1 className="text-2xl font-semibold text-navy">Questionnaire</h1>
        <p className="mt-4 text-text-muted">
          This page is only available after you complete your purchase. Use the
          link from your confirmation, or start from the Services page.
        </p>
        <div className="mt-8">
          <Button href="/services">Go to Services</Button>
        </div>
      </div>
    );
  }

  const stripe = getStripe();
  let session: Awaited<ReturnType<typeof stripe.checkout.sessions.retrieve>>;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return (
      <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 sm:py-16 text-center">
        <h1 className="text-2xl font-semibold text-navy">Invalid session</h1>
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

  if (session.payment_status !== "paid") {
    return (
      <div className="mx-auto max-w-xl px-4 py-12 sm:px-6 sm:py-16 text-center">
        <h1 className="text-2xl font-semibold text-navy">
          Payment not completed
        </h1>
        <p className="mt-4 text-text-muted">
          Your payment was not completed. Please complete purchase to access the
          questionnaire.
        </p>
        <div className="mt-8">
          <Button href="/services">Go to Services</Button>
        </div>
      </div>
    );
  }

  const customerEmail =
    (session.customer_details?.email as string | undefined) ?? "";
  const customerName =
    (session.customer_details?.name as string | undefined) ?? undefined;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-2xl font-semibold text-navy">Questionnaire</h1>
      <p className="mt-2 text-text-muted">
        Complete the form below. Your evaluation will be delivered within 3
        business days.
      </p>
      <QuestionnaireForm
        sessionId={sessionId}
        customerEmail={customerEmail}
        customerName={customerName}
      />
    </div>
  );
}
