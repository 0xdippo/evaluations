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
              Clear, Honest Evaluation
            </h3>
            <p className="mt-2 text-sm text-text-muted">
              A real assessment from a 35-year college head coach.
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold text-navy">
              Position-Specific Insight
            </h3>
            <p className="mt-2 text-sm text-text-muted">
              Strengths, weaknesses, and development priorities.
            </p>
          </Card>
          <Card>
            <h3 className="font-semibold text-navy">
              A Real Plan Forward
            </h3>
            <p className="mt-2 text-sm text-text-muted">
              What to do next, step-by-step.
            </p>
          </Card>
        </div>
      </section>

      <section className="mt-16 sm:mt-24">
        <h2 className="text-xl font-semibold text-navy">
          Recruiting Changed. Families Need Clarity.
        </h2>
        <p className="mt-4 text-text-muted">
          The transfer portal has shifted opportunities toward proven college
          players, making the path tougher for high school athletes. Coach
          Campbell brings 35 years of college experience and 22 years as a head
          coach to give families honest clarity and a real plan forward.
        </p>
      </section>

      {/* Why different */}
      <section className="mt-16 sm:mt-24">
        <h2 className="text-xl font-semibold text-navy">
          Why we&apos;re different
        </h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-text-muted">
          <li>35 Years of College Coaching</li>
          <li>No Agendas, No Sales Pitch</li>
          <li>Built for Parents and Athletes</li>
        </ul>
      </section>

      {/* How it works */}
      <section className="mt-16 sm:mt-24">
        <h2 className="text-xl font-semibold text-navy">
          How it works
        </h2>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-text-muted">
          <li>Purchase your evaluation</li>
          <li>Submit your video + questionnaire</li>
          <li>Receive a full breakdown</li>
          <li>Get a real plan forward</li>
        </ol>
      </section>

      {/* About Coach Campbell */}
      <section className="mt-16 sm:mt-24">
        <h2 className="text-xl font-semibold text-navy">
          About Coach Campbell
        </h2>
        <blockquote className="mt-4 text-text-muted italic">
          &ldquo;I spent 35 years as a college football coach.
          <br />
          <br />
          I created Campbell Football Evaluations to give families clarity,
          honesty, and a real plan forward — without the sales pitches, false
          promises, or confusion that surround the recruiting world.&rdquo;
        </blockquote>
      </section>

      {/* Final CTA */}
      <section className="mt-16 sm:mt-24 text-center">
        <Button href="/services">Get Your Evaluation</Button>
      </section>
    </div>
  );
}
