import Link from "next/link";
import { Card } from "@/components/Card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Campbell Football Evaluations",
  description:
    "$149 one-time evaluation. Full highlight evaluation, position-specific insight, and a real plan forward. Delivered in 3 business days.",
};

const STRIPE_PAYMENT_LINK = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_URL;

export default function Services() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-navy">
        Evaluation &amp; Services
      </h1>
      <p className="mt-4 text-text-muted">
        Every evaluation is built to give families clarity, truth, and a real
        plan forward.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-navy">
        What&apos;s included
      </h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-text-muted">
        <li>Full highlight evaluation</li>
        <li>
          Athletic traits assessment (speed, movement, physicality,
          competitiveness, position-specific traits)
        </li>
        <li>
          Position-specific notes (strengths, weaknesses, priorities)
        </li>
        <li>
          Recruiting trajectory guidance (what&apos;s realistic and next steps)
        </li>
        <li>Action plan</li>
      </ul>

      <Card className="mt-10">
        <p className="text-2xl font-semibold text-navy">$149 one-time</p>
        <p className="mt-2 text-sm text-text-muted">
          No upsells. No subscriptions. No hidden charges.
        </p>
        <p className="mt-2 text-sm text-text-muted">
          Delivered within 3 business days as a PDF.
        </p>
        <div className="mt-6">
          {STRIPE_PAYMENT_LINK ? (
            <a
              href={STRIPE_PAYMENT_LINK}
              className="inline-flex items-center justify-center rounded-md bg-navy px-5 py-2.5 text-sm font-medium text-page-bg hover:bg-navy-hover focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 transition-colors"
            >
              Get Started (Purchase)
            </a>
          ) : (
            <p className="text-sm text-amber-700">
              Payment link not configured. Set NEXT_PUBLIC_STRIPE_PAYMENT_LINK_URL
              in .env.local.
            </p>
          )}
        </div>
      </Card>

      <p className="mt-8 text-sm text-text-muted">
        <Link
          href="/faq"
          className="text-navy underline hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 rounded transition-colors"
        >
          FAQ
        </Link>
      </p>
    </div>
  );
}
