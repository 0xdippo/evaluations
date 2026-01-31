import { Button } from "@/components/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Campbell Football Evaluations",
  description:
    "After 35 years coaching college football, Coach Campbell gives families straight answers and a real plan forward.",
};

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-navy">
        About
      </h1>

      <p className="mt-6 text-text-muted">
        Families deserve straight answers. After 35 years coaching college
        football at the JUCO, Division II, FCS, and FBS levels, I created this
        to give parents and athletes the truth — clearly, calmly, and without
        hype.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-navy">
        Why I built this
      </h2>
      <p className="mt-2 text-text-muted">
        For decades, I sat in staff rooms where real evaluations were
        made—and as the final authority on scholarship decisions, I know
        exactly what coaches look for.
      </p>
      <p className="mt-2 text-text-muted">
        Families deserve honest clarity about where an athlete stands and
        what to do next.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-navy">
        Resume highlights
      </h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-text-muted">
        <li>Multi-time National Champion (NJCAA &amp; NCAA Division II)</li>
        <li>National Coach of the Year (2×)</li>
        <li>
          Inducted into NJCAA, MGCCC, MACCC, and Delta State Hall of Fames
        </li>
        <li>D1 FCS Conference Coach of the Year</li>
        <li>Head coaching experience at JUCO, D2, FCS, and FBS</li>
        <li>35 years evaluating and developing college athletes</li>
        <li>Sent players to Power 4, FCS, Group of 5, NFL, NAIA, D2, and D3</li>
      </ul>

      <p className="mt-8 text-text-muted">
        You will receive the same level of evaluation I gave my college
        athletes — honest, detailed, and actionable. No agendas. No sales
        pitch.
      </p>

      <div className="mt-10">
        <Button href="/services">Get Your Evaluation</Button>
      </div>
    </div>
  );
}
