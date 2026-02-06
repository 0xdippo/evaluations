"use client";

import { useState } from "react";
import { Button } from "@/components/Button";

export type QuestionnaireAnswers = {
  athleteName: string;
  athletePosition: string;
  gradYear: string;
  school: string;
  videoLink: string;
  goals: string;
  notes: string;
};

const initial: QuestionnaireAnswers = {
  athleteName: "",
  athletePosition: "",
  gradYear: "",
  school: "",
  videoLink: "",
  goals: "",
  notes: "",
};

const inputClass =
  "mt-1 block w-full rounded-md border border-navy/25 px-3 py-2 text-navy focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold";
const labelClass = "block text-sm font-medium text-navy";

type Props = {
  sessionId: string;
  customerEmail: string;
  customerName?: string;
};

export function QuestionnaireForm({
  sessionId,
  customerEmail,
  customerName,
}: Props) {
  const [data, setData] = useState<QuestionnaireAnswers>(initial);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const update = (fields: Partial<QuestionnaireAnswers>) =>
    setData((prev) => ({ ...prev, ...fields }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const res = await fetch("/api/questionnaire/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        answers: {
          athleteName: data.athleteName.trim(),
          athletePosition: data.athletePosition.trim(),
          gradYear: data.gradYear.trim(),
          school: data.school.trim(),
          videoLink: data.videoLink.trim(),
          goals: data.goals.trim(),
          notes: data.notes.trim(),
        },
      }),
    });

    const json = await res.json().catch(() => ({}));

    if (res.ok) {
      setStatus("success");
      return;
    }

    setStatus("error");
    setErrorMessage(json.error ?? `Request failed (${res.status})`);
  }

  if (status === "success") {
    return (
      <div className="mt-8 rounded-lg border border-gold/30 bg-gold/10 p-6 text-center">
        <p className="text-lg font-medium text-navy">
          Submitted. We received your questionnaire. Expect your evaluation
          within 3 business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div>
        <label htmlFor="athleteName" className={labelClass}>
          Athlete name *
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
        <label htmlFor="athletePosition" className={labelClass}>
          Position(s) *
        </label>
        <input
          id="athletePosition"
          type="text"
          required
          placeholder="e.g. QB, WR"
          value={data.athletePosition}
          onChange={(e) => update({ athletePosition: e.target.value })}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="gradYear" className={labelClass}>
          Graduation year *
        </label>
        <input
          id="gradYear"
          type="text"
          required
          placeholder="e.g. 2026"
          value={data.gradYear}
          onChange={(e) => update({ gradYear: e.target.value })}
          className={inputClass}
        />
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
        <label htmlFor="videoLink" className={labelClass}>
          HUDL or highlight reel link *
        </label>
        <input
          id="videoLink"
          type="url"
          required
          placeholder="https://..."
          value={data.videoLink}
          onChange={(e) => update({ videoLink: e.target.value })}
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
        <label htmlFor="notes" className={labelClass}>
          Notes (optional)
        </label>
        <textarea
          id="notes"
          rows={2}
          value={data.notes}
          onChange={(e) => update({ notes: e.target.value })}
          className={inputClass}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600" role="alert">
          {errorMessage}
        </p>
      )}

      <div className="pt-2">
        <Button type="submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Submitting…" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
