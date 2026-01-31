import { Button } from "@/components/Button";
import { Card } from "@/components/Card";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
          Parents Deserve Straight Answers. Athletes Deserve Real Insight.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-text-muted">
          A college coach with 35 years of experience—22 as a head coach—giving
          families clarity and a real plan forward.
        </p>
        <div className="mt-8">
          <Button href="/services">Get Your Evaluation</Button>
        </div>
      </section>

      {/* What you get */}
      <section className="mt-16 sm:mt-24">
        <h2 className="sr-only">What you get</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <Card>
            <h3 className="font-semibold text-navy">
              Real Clarity
            </h3>
            <p className="mt-2 text-sm text-text-muted">
              No hype and no guessing. You&apos;ll get a clear picture of where
              you stand right now and what&apos;s realistic moving forward.
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold text-navy">
              Position-Specific Feedback
            </h3>
            <p className="mt-2 text-sm text-text-muted">
              Clear notes on strengths, weaknesses, and development priorities
              tailored to your position. Not generic tips—specific, actionable
              points you can train.
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold text-navy">
              Real Direction
            </h3>
            <p className="mt-2 text-sm text-text-muted">
              A practical roadmap—what to work on, how to present your film,
              and what steps make sense for your next recruiting moves.
            </p>
          </Card>
        </div>
      </section>

      <section className="mt-16 sm:mt-24">
        <h2 className="text-xl font-semibold text-navy">
          Recruiting Changed. Families Need Clarity.
        </h2>
        <p className="mt-4 text-text-muted">
          With the transfer portal reshaping opportunities, the path is harder
          for high school athletes. Coach Campbell provides honest evaluation
          and a clear plan forward—without hype or sales pitches.
        </p>
      </section>

      {/* Why different */}
      <section className="mt-16 sm:mt-24">
        <h2 className="text-xl font-semibold text-navy">
          Why We&apos;re Different
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-text-muted">
          <li>Experience at every level of college football</li>
          <li>No agendas, no sales pitch</li>
          <li>Built for parents and athletes</li>
        </ul>
      </section>

      {/* How it works */}
      <section className="mt-16 sm:mt-24">
        <h2 className="text-xl font-semibold text-navy">
          How it works
        </h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-text-muted">
          <li>Purchase your evaluation</li>
          <li>Submit film + questionnaire</li>
          <li>Get a full breakdown</li>
          <li>Move forward with a real plan</li>
        </ol>
      </section>

      {/* About Coach Campbell */}
      <section className="mt-16 sm:mt-24">
        <h2 className="text-xl font-semibold text-navy">
          About Coach Campbell
        </h2>
        <blockquote className="mt-4 text-text-muted italic">
          &ldquo;My coaching career has taken me through the SEC, FCS, Division
          II, and junior college ranks.
          <br />
          <br />
          Those experiences shaped how I evaluate athletes, and I created
          Campbell Football Evaluations to give families clarity, honesty, and
          a real plan forward — without the sales pitches, false promises, or
          confusion that surround the recruiting world.&rdquo;
        </blockquote>
      </section>

      {/* Final CTA */}
      <section className="mt-16 sm:mt-24 text-center">
        <Button href="/services">Get Your Evaluation</Button>
      </section>
    </div>
  );
}
