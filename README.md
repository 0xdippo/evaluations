# Campbell Football Evaluations

Marketing site and paid intake flow for Campbell Football Evaluations. Next.js (App Router), TypeScript, Tailwind CSS. Payments via Stripe (Payment Link + Checkout Session verification). Emails via Resend. No database — all intake data is emailed to the business.

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `STRIPE_SECRET_KEY` | Stripe secret key (Dashboard → Developers → API keys). Required for verifying payment on `/get-started`. |
| `NEXT_PUBLIC_STRIPE_PAYMENT_LINK_URL` | Your Stripe Payment Link URL. Create in Stripe Dashboard → Product catalog → Payment Links. **Success URL:** set to `http://localhost:3000/get-started?session_id={CHECKOUT_SESSION_ID}` for local dev (replace with your production URL when deploying). |
| `RESEND_API_KEY` | Resend API key (resend.com). Required for sending the questionnaire submission to the business and optional parent confirmation. |
| `FROM_EMAIL` | Sender for transactional emails (e.g. `Campbell Evaluations <no-reply@yourdomain.com>`). Must be a verified domain in Resend, or omit to use Resend’s default onboarding sender. |

### 3. Stripe Payment Link

1. In [Stripe Dashboard](https://dashboard.stripe.com), create a product (e.g. “Football Evaluation — $149”).
2. Create a **Payment Link** for that product.
3. In the Payment Link settings, set **After payment** → **Redirect to a URL** to:
   - Local: `http://localhost:3000/get-started?session_id={CHECKOUT_SESSION_ID}`
   - Production: `https://yourdomain.com/get-started?session_id={CHECKOUT_SESSION_ID}`
4. Paste the Payment Link URL into `NEXT_PUBLIC_STRIPE_PAYMENT_LINK_URL` in `.env.local`.

### 4. Resend

1. Sign up at [resend.com](https://resend.com) and get an API key.
2. Add `RESEND_API_KEY` to `.env.local`.
3. For a custom sender, verify your domain in Resend and set `FROM_EMAIL` (e.g. `Campbell Evaluations <no-reply@yourdomain.com>`). Otherwise you can omit `FROM_EMAIL` to use Resend’s default sender for testing.

### 5. Local development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

- **Without Stripe/Resend:** Home, About, Services, and FAQ work. The Services page will show a message if the payment link isn’t set. Get Started without a valid `session_id` or with an invalid/unpaid session shows the appropriate message.
- **With Stripe:** Use a test Payment Link and test card. After payment, you’re redirected to `/get-started?session_id=...` and can complete the questionnaire.
- **With Resend:** Submitting the questionnaire sends an email to `campbellfootballevaluations@gmail.com` and an optional confirmation to the parent email.

### 6. Build and run production

```bash
npm run build
npm start
```

## Deploy

1. Set the same env vars in your host (Vercel, etc.).
2. Update the Stripe Payment Link success URL to your production domain: `https://yourdomain.com/get-started?session_id={CHECKOUT_SESSION_ID}`.

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home |
| `/about` | About Coach Campbell |
| `/services` | Services and pricing; CTA to Stripe Payment Link |
| `/faq` | FAQ accordion |
| `/get-started?session_id=...` | Questionnaire (gated by Stripe payment verification) |

## Business rules

- **Price:** $149 one-time. No database; intake is emailed only.
- **Deliverable:** PDF evaluation; turnaround 3 business days.
- **Get Started:** Questionnaire is only shown after Stripe Checkout Session is verified as `payment_status === "paid"`.
- **On submit:** Email to `campbellfootballevaluations@gmail.com` with all fields and Stripe `session_id`; optional confirmation email to parent; on-page message: “Submitted. Expect your PDF within 3 business days.”
