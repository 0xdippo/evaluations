import { Accordion } from "@/components/Accordion";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Campbell Football Evaluations",
  description:
    "Common questions about age groups, turnaround time, and what to submit.",
};

const faqItems = [
  {
    id: "age-groups",
    question: "What age groups do you evaluate?",
    answer: (
      <p>
        I evaluate high school athletes who are actively pursuing college
        football opportunities. The evaluation is designed for families seeking
        honest recruiting clarity and a real plan forward.
      </p>
    ),
  },
  {
    id: "turnaround",
    question: "How long does the evaluation take?",
    answer: (
      <p>
        Your PDF evaluation is delivered within 3 business days after you
        submit your video and questionnaire.
      </p>
    ),
  },
  {
    id: "submit",
    question: "What do I need to submit?",
    answer: (
      <p>
        After payment, you&apos;ll complete a questionnaire with athlete and
        parent/guardian info, position(s), height, weight, school, and HUDL or
        highlight tape. Optional fields include academic info, measurables,
        injury history, and goals. HUDL/highlight tape link are required so I
        can evaluate film.
      </p>
    ),
  },
  {
    id: "different",
    question: "What makes this evaluation different?",
    answer: (
      <p>
        35 years as a college football coach, with 22 years as head coach at
        JUCO, D2, FCS, and FBS. No agendas, no sales pitch — just honest
        assessment and a real plan forward for parents and athletes.
      </p>
    ),
  },
];

export default function FAQ() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-navy">
        FAQ
      </h1>
      <div className="mt-8">
        <Accordion items={faqItems} />
      </div>
    </div>
  );
}
