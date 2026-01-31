"use server";

import { Resend } from "resend";

const TO_EMAIL = "campbellfootballevaluations@gmail.com";

export type QuestionnaireData = {
  parentName: string;
  parentEmail: string;
  athleteName: string;
  athleteGradYear: string;
  positions: string;
  height: string;
  weight: string;
  school: string;
  videoLinks: string;
  academicInfo?: string;
  measurables?: string;
  injuryHistory?: string;
  goals?: string;
  stripeSessionId: string;
};

function formatEmailBody(data: QuestionnaireData): string {
  const lines = [
    `Parent/Guardian Name: ${data.parentName}`,
    `Parent Email: ${data.parentEmail}`,
    `Athlete Name: ${data.athleteName}`,
    `Athlete Grad Year: ${data.athleteGradYear}`,
    `Position(s): ${data.positions}`,
    `Height: ${data.height}`,
    `Weight: ${data.weight}`,
    `School: ${data.school}`,
    `Video Links: ${data.videoLinks}`,
    "",
    "--- Optional ---",
    `Academic Info: ${data.academicInfo ?? "(not provided)"}`,
    `Measurables: ${data.measurables ?? "(not provided)"}`,
    `Injury History: ${data.injuryHistory ?? "(not provided)"}`,
    `Goals: ${data.goals ?? "(not provided)"}`,
    "",
    `Stripe Session ID: ${data.stripeSessionId}`,
  ];
  return lines.join("\n");
}

export type SubmitResult =
  | { ok: true }
  | { ok: false; error: string };

export async function submitQuestionnaire(
  data: QuestionnaireData
): Promise<SubmitResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "Email not configured." };
  }

  const fromEmail =
    process.env.FROM_EMAIL ?? "Campbell Evaluations <onboarding@resend.dev>";
  const resend = new Resend(apiKey);
  const subject = `New Evaluation Submission — ${data.athleteName} (${data.athleteGradYear})`;
  const body = formatEmailBody(data);

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: TO_EMAIL,
      subject,
      text: body,
    });
    if (error) {
      return { ok: false, error: error.message };
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to send email.";
    return { ok: false, error: message };
  }

  // Optional: send confirmation to parent
  try {
    await resend.emails.send({
      from: fromEmail,
      to: data.parentEmail,
      subject: "Campbell Football Evaluations — We received your submission",
      text: `Hi ${data.parentName},\n\nWe received your evaluation submission for ${data.athleteName}. Expect your PDF within 3 business days.\n\n— Campbell Football Evaluations`,
    });
  } catch {
    // Non-fatal; main email to business was sent
  }

  return { ok: true };
}
