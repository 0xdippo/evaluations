"use client";

import { useState } from "react";
import { submitQuestionnaire } from "@/app/actions/questionnaire";
import { Button } from "@/components/Button";

type FormData = {
  parentName: string;
  parentEmail: string;
  athleteName: string;
  athleteGradYear: string;
  positions: string;
  height: string;
  weight: string;
  school: string;
  videoLinks: string;
  academicInfo: string;
  measurables: string;
  injuryHistory: string;
  goals: string;
  primaryReason: string;
  evaluationQuestions: string;
};

const initial: FormData = {
  parentName: "",
  parentEmail: "",
  athleteName: "",
  athleteGradYear: "",
  positions: "",
  height: "",
  weight: "",
  school: "",
  videoLinks: "",
  academicInfo: "",
  measurables: "",
  injuryHistory: "",
  goals: "",
  primaryReason: "",
  evaluationQuestions: "",
};

const inputClass =
  "mt-1 block w-full rounded-md border border-navy/25 px-3 py-2 text-navy focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold";
const labelClass = "block text-sm font-medium text-navy";

export function GetStartedClient({ sessionId }: { sessionId: string }) {
  const [data, setData] = useState<FormData>(initial);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const update = (fields: Partial<FormData>) =>
    setData((prev) => ({ ...prev, ...fields }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    const result = await submitQuestionnaire({
      parentName: data.parentName.trim(),
      parentEmail: data.parentEmail.trim(),
      athleteName: data.athleteName.trim(),
      athleteGradYear: data.athleteGradYear.trim(),
      positions: data.positions.trim(),
      height: data.height.trim(),
      weight: data.weight.trim(),
      school: data.school.trim(),
      videoLinks: data.videoLinks.trim(),
      academicInfo: data.academicInfo.trim() || undefined,
      measurables: data.measurables.trim() || undefined,
      injuryHistory: data.injuryHistory.trim() || undefined,
      goals: data.goals.trim() || undefined,
      primaryReason: data.primaryReason.trim() || undefined,
      evaluationQuestions: data.evaluationQuestions.trim() || undefined,
      stripeSessionId: sessionId,
    });
    if (result.ok) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMessage(result.error);
    }
  }

  if (status === "success") {
    return (
      <div className="mt-8 rounded-lg border border-gold/30 bg-gold/10 p-6 text-center">
        <p className="text-lg font-medium text-navy">
          Submitted. Expect your PDF within 3 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-10">
      {/* Contact & Athlete */}
      <section>
        <h2 className="text-lg font-semibold text-navy border-b border-navy/20 pb-2 mb-4">
          Contact & Athlete
        </h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="parentName" className={labelClass}>
              Parent/Guardian Name *
            </label>
            <input
              id="parentName"
              type="text"
              required
              value={data.parentName}
              onChange={(e) => update({ parentName: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="parentEmail" className={labelClass}>
              Parent Email *
            </label>
            <input
              id="parentEmail"
              type="email"
              required
              value={data.parentEmail}
              onChange={(e) => update({ parentEmail: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="athleteName" className={labelClass}>
              Athlete Name *
            </label>
            <input
              id="athleteName"
              type="text"
              required
              value={data.athleteName}
              onChange={(e) => update({ athleteName: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="athleteGradYear" className={labelClass}>
              Athlete Grad Year *
            </label>
            <input
              id="athleteGradYear"
              type="text"
              required
              placeholder="e.g. 2026"
              value={data.athleteGradYear}
              onChange={(e) => update({ athleteGradYear: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* Details & Video */}
      <section>
        <h2 className="text-lg font-semibold text-navy border-b border-navy/20 pb-2 mb-4">
          Details & Video
        </h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="positions" className={labelClass}>
              Position(s) *
            </label>
            <input
              id="positions"
              type="text"
              required
              placeholder="e.g. QB, WR"
              value={data.positions}
              onChange={(e) => update({ positions: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="height" className={labelClass}>
                Height *
              </label>
              <input
                id="height"
                type="text"
                required
                placeholder="e.g. 6-2"
                value={data.height}
                onChange={(e) => update({ height: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="weight" className={labelClass}>
                Weight *
              </label>
              <input
                id="weight"
                type="text"
                required
                placeholder="e.g. 185"
                value={data.weight}
                onChange={(e) => update({ weight: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label htmlFor="school" className={labelClass}>
              School *
            </label>
            <input
              id="school"
              type="text"
              required
              value={data.school}
              onChange={(e) => update({ school: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="videoLinks" className={labelClass}>
              HUDL or highlight reel link *
            </label>
            <textarea
              id="videoLinks"
              required
              rows={3}
              placeholder="https://..."
              value={data.videoLinks}
              onChange={(e) => update({ videoLinks: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* Optional */}
      <section>
        <h2 className="text-lg font-semibold text-navy border-b border-navy/20 pb-2 mb-4">
          Optional
        </h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="academicInfo" className={labelClass}>
              Academic Info (optional)
            </label>
            <input
              id="academicInfo"
              type="text"
              placeholder="GPA, test scores"
              value={data.academicInfo}
              onChange={(e) => update({ academicInfo: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="measurables" className={labelClass}>
              Measurables (optional)
            </label>
            <input
              id="measurables"
              type="text"
              placeholder="40 time, bench press, power clean, vertical, etc"
              value={data.measurables}
              onChange={(e) => update({ measurables: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="injuryHistory" className={labelClass}>
              Injury History (optional)
            </label>
            <textarea
              id="injuryHistory"
              rows={2}
              value={data.injuryHistory}
              onChange={(e) => update({ injuryHistory: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="goals" className={labelClass}>
              Goals (optional)
            </label>
            <textarea
              id="goals"
              rows={2}
              value={data.goals}
              onChange={(e) => update({ goals: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="primaryReason" className={labelClass}>
              What is the primary reason for seeking evaluation at this time?
              (optional)
            </label>
            <textarea
              id="primaryReason"
              rows={2}
              value={data.primaryReason}
              onChange={(e) => update({ primaryReason: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="evaluationQuestions" className={labelClass}>
              What questions do you most want this evaluation to answer?
              (optional)
            </label>
            <textarea
              id="evaluationQuestions"
              rows={2}
              value={data.evaluationQuestions}
              onChange={(e) => update({ evaluationQuestions: e.target.value })}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {status === "error" && (
        <p className="text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      )}

      <p className="text-sm text-text-muted">
        Please review your answers before submitting. Submitting confirms that
        the information you provided is accurate.
      </p>
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
          className="mt-1 rounded border-navy/25 text-gold focus:ring-gold focus:ring-offset-0"
        />
        <span className="text-sm text-navy group-hover:text-navy/90">
          I understand this evaluation is an independent, honest assessment based on highlight film, graduation year, and experience. No recruiting guarantees or promises are made.
        </span>
      </label>

      <div className="pt-2">
        <Button
          type="submit"
          disabled={status === "submitting" || !confirmed}
        >
          {status === "submitting" ? "Submitting…" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
