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
        {/* Background image: anchored to top, bottom cropped by container, slight blur */}
        <div
          className="absolute inset-0 bg-cover bg-top bg-no-repeat blur-[2px]"
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
          <p className="mx-auto mt-4 max-w-2xl text-xl font-medium text-page-bg/95 [text-shadow:0_2px_4px_rgba(0,0,0,0.6)]">
            College football evaluations from a proven two-time National
            Champion head coach.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-page-bg/90 [text-shadow:0_2px_4px_rgba(0,0,0,0.6)]">
            34 years of college coaching experience. Clear, honest evaluations,
            built to help families make the right decisions.
          </p>
          <div className="mt-8">
            <Button href="/services" variant="secondary">Get Your Evaluation</Button>
          </div>
        </div>
      </section>

      {/* Main content */}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      {/* What This Is + cards */}
      <section className="mt-0 sm:mt-0 text-center">
        <h2 className="text-xl font-semibold text-navy">
          What the Evaluation Is
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-text-muted">
          Coach Campbell reviews your film the way a college staff would. You&apos;ll get a clear breakdown of what you&apos;re doing well, what&apos;s costing you, and what needs to improve - plus a realistic plan for your next steps based on where you are right now.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <Card>
            <div className="text-center">
              <h3 className="font-semibold text-navy">
                Real Clarity
              </h3>
              <p className="mt-2 text-sm text-text-muted">
                You&apos;ll know exactly what shows up on film - the good, the bad, and the in-between. No buzzwords, no false confidence. Just an honest snapshot of where you are today and what that means for recruiting.
              </p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <h3 className="font-semibold text-navy">
                Position-Specific Feedback
              </h3>
              <p className="mt-2 text-sm text-text-muted">
                Every position is judged differently. You&apos;ll get specific coaching points tied to your role - what recruiters want to see, what&apos;s missing, and the priorities that will move you forward fastest.
              </p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <h3 className="font-semibold text-navy">
                Real Direction
              </h3>
              <p className="mt-2 text-sm text-text-muted">
                This isn&apos;t just &quot;here&apos;s what you did.&quot; You&apos;ll leave with a practical plan: what to train, what to clean up, how to build better film, and which next steps actually fit your situation.
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
          and a clear path forward-without hype or sales pitches.
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
          a real plan forward - without the sales pitches, false promises, or
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
