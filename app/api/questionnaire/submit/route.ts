import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getResendClient, from } from "@/lib/resend";

export const runtime = "nodejs";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "";
const ADMIN_NOTIFY_EMAIL = process.env.ADMIN_NOTIFY_EMAIL;

type Answers = {
  athleteName?: string;
  athletePosition?: string;
  gradYear?: string;
  school?: string;
  videoLink?: string;
  goals?: string;
  notes?: string;
};

function formatAdminBody(answers: Answers, customerEmail: string): string {
  const lines = [
    "New Questionnaire Submission",
    "---",
    `Athlete name: ${answers.athleteName ?? ""}`,
    `Position(s): ${answers.athletePosition ?? ""}`,
    `Grad year: ${answers.gradYear ?? ""}`,
    `School: ${answers.school ?? ""}`,
    `Video link: ${answers.videoLink ?? ""}`,
    `Goals: ${answers.goals ?? ""}`,
    `Notes: ${answers.notes ?? ""}`,
    "---",
    `Customer email: ${customerEmail}`,
    "",
    "Raw JSON:",
    JSON.stringify(answers, null, 2),
  ];
  return lines.join("\n");
}

export async function POST(request: NextRequest) {
  let body: { sessionId?: string; answers?: Answers };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  const { sessionId, answers } = body;
  if (!sessionId || typeof sessionId !== "string") {
    return NextResponse.json(
      { error: "sessionId is required" },
      { status: 400 }
    );
  }
  if (!answers || typeof answers !== "object") {
    return NextResponse.json(
      { error: "answers object is required" },
      { status: 400 }
    );
  }

  const stripe = getStripe();
  let session: Awaited<ReturnType<typeof stripe.checkout.sessions.retrieve>>;
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return NextResponse.json(
      { error: "Invalid session" },
      { status: 400 }
    );
  }

  if (session.payment_status !== "paid") {
    return NextResponse.json(
      { error: "Payment not completed" },
      { status: 403 }
    );
  }

  const customerEmail =
    (session.customer_details?.email as string | undefined) ?? "";

  const athleteName = answers.athleteName ?? "—";
  const position = answers.athletePosition ?? "—";
  const adminSubject = `New Questionnaire Submission — ${athleteName} (${position})`;

  const resend = getResendClient();
  if (ADMIN_NOTIFY_EMAIL) {
    try {
      await resend.emails.send({
        from,
        to: ADMIN_NOTIFY_EMAIL,
        subject: adminSubject,
        text: formatAdminBody(answers, customerEmail),
        html: `<pre style="white-space: pre-wrap; font-family: sans-serif;">${formatAdminBody(answers, customerEmail).replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>`,
      });
    } catch (e) {
      console.error("Admin email failed:", e);
    }
  }

  const resumeLink = `${APP_URL}/questionnaire?session_id=${encodeURIComponent(sessionId)}`;
  const customerSubject = "We received your questionnaire";

  if (customerEmail) {
    try {
      await resend.emails.send({
        from,
        to: customerEmail,
        subject: customerSubject,
        text: `We received your questionnaire. Expect your evaluation within 3 business days.\n\nResume link (for your records): ${resumeLink}`,
        html: `<p>We received your questionnaire. Expect your evaluation within 3 business days.</p><p>Resume link (for your records): <a href="${resumeLink}">${resumeLink}</a></p>`,
      });
    } catch (e) {
      console.error("Customer confirmation email failed:", e);
    }
  }

  return NextResponse.json({ success: true });
}
