import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Carousel } from "@/components/Carousel";

export default function Home() {
  return (
    <>
      {/* Hero: full width, image behind content, cropped from bottom */}
      <section
        className="relative w-full min-h-[52vh] sm:min-h-[58vh] flex flex-col items-center justify-center bg-navy text-center"
        aria-label="Hero"
      >
        {/* Background image: anchored to top, bottom cropped by container */}
        <div
          className="absolute inset-0 bg-cover bg-top bg-no-repeat"
          style={{ backgroundImage: "url('/hero-coach.png')" }}
          aria-hidden
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-navy/80" aria-hidden />
        {/* Content */}
        <div className="relative z-10 mx-auto max-w-3xl px-4 py-16 sm:py-20">
          <h1 className="text-3xl font-semibold tracking-tight text-page-bg sm:text-4xl [text-shadow:0_2px_4px_rgba(0,0,0,0.6)]">
            Parents Deserve Straight Answers. Athletes Deserve Real Insight.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-page-bg/90 [text-shadow:0_2px_4px_rgba(0,0,0,0.6)]">
            A college coach with 35 years of experience, 22 as a head coach,
            giving families clarity and a real plan forward.
          </p>
          <div className="mt-8">
            <Button href="/services" variant="secondary">Get Your Evaluation</Button>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      {/* What you get */}
      <section className="mt-0 sm:mt-0">
        <h2 className="sr-only">What you get</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <Card>
            <div className="text-center">
              <h3 className="font-semibold text-navy">
                Real Clarity
              </h3>
              <p className="mt-2 text-sm text-text-muted">
                No hype and no guessing. You&apos;ll get a clear picture of where
                you stand right now and what&apos;s realistic moving forward.
              </p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <h3 className="font-semibold text-navy">
                Position-Specific Feedback
              </h3>
              <p className="mt-2 text-sm text-text-muted">
                Clear notes on strengths, weaknesses, and development priorities
                tailored to your position. Not generic tips—specific, actionable
                points you can train.
              </p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <h3 className="font-semibold text-navy">
                Real Direction
              </h3>
              <p className="mt-2 text-sm text-text-muted">
                A practical roadmap—what to work on, how to present your film,
                and what steps make sense for your next recruiting moves.
              </p>
            </div>
          </Card>
        </div>
      </section>

      <section className="mt-16 sm:mt-24 mx-auto max-w-2xl text-center">
        <h2 className="text-xl font-semibold text-navy">
          Recruiting Changed. Families Need Clarity.
        </h2>
        <p className="mt-4 text-text-muted">
          With the transfer portal reshaping opportunities, the path is harder
          for high school athletes. Coach Campbell provides an honest evaluation
          and a clear plan forward—without hype or sales pitches.
        </p>
      </section>

      {/* Why different + How it works: side by side, centered */}
      <div className="mt-16 sm:mt-24 mx-auto grid max-w-4xl grid-cols-1 gap-10 md:grid-cols-2 md:gap-20">
        <section className="text-center">
          <h2 className="text-xl font-semibold text-navy">
            Why We&apos;re Different
          </h2>
          <div className="mt-4 space-y-2 text-text-muted">
            <p>Experience at every collegiate level</p>
            <p>Built for parents and athletes</p>
            <p>No agendas, no sales pitch</p>
            <p>Proven track record</p>
          </div>
        </section>
        <section className="text-center">
          <h2 className="text-xl font-semibold text-navy">
            How it works
          </h2>
          <div className="mt-4 space-y-2 text-text-muted">
            <p>Request your evaluation</p>
            <p>Submit film + questionnaire</p>
            <p>Get a full PDF breakdown</p>
            <p>Move forward with a real plan</p>
          </div>
        </section>
      </div>

      <Carousel />

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
    </>
  );
}
