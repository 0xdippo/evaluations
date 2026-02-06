import { Resend } from "resend";

let _resend: Resend | null = null;
function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY is not set");
  return new Resend(apiKey);
}

export function getResendClient(): Resend {
  if (!_resend) _resend = getResend();
  return _resend;
}

export const resend = new Proxy({} as Resend, {
  get(_, prop) {
    return (getResendClient() as unknown as Record<string, unknown>)[prop as string];
  },
});

export const from =
  process.env.RESEND_FROM_EMAIL ?? "noreply@yourdomain.com";
