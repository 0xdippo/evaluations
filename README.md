# Campbell Football Evaluations

Marketing site and paid intake flow. Next.js (App Router), TypeScript, Tailwind CSS. **Stripe Checkout** (hosted) → redirect to **/questionnaire** → customer fills form → **questionnaire is emailed to you** via Resend (plus a confirmation email to the customer).

## Flow

1. User clicks “Get Started (Purchase)” on Services → POST `/api/checkout` → redirect to Stripe Checkout.
2. On success, Stripe redirects to `/questionnaire?session_id={CHECKOUT_SESSION_ID}`.
3. Questionnaire page is **gated**: only shows the form if the session exists and `payment_status === "paid"`.
4. User submits form → POST `/api/questionnaire/submit`. Server re-verifies session is paid, **emails you** the submission (to `ADMIN_NOTIFY_EMAIL`), and emails the customer a confirmation with a resume link.
5. No database - everything is sent to your email. All outgoing email is via Resend from your domain (e.g. `noreply@yourdomain.com`).

## Setup (local)

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy the example and fill in:

```bash
cp .env.example .env.local
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_APP_URL` | Full app URL (e.g. `http://localhost:3000` local, `https://yourdomain.com` prod). Used for Stripe success/cancel URLs and email links. |
| `STRIPE_SECRET_KEY` | Stripe secret key (Dashboard → Developers → API keys). |
| `STRIPE_PRICE_ID` | Stripe **Price** ID for the evaluation product (e.g. $149). Create a product + price in Dashboard, then use the `price_xxx` ID. |
| `RESEND_API_KEY` | Resend API key (resend.com). |
| `RESEND_FROM_EMAIL` | Sender for all emails (e.g. `noreply@yourdomain.com`). Must be verified in Resend. |
| `ADMIN_NOTIFY_EMAIL` | **Your email** - where questionnaire submissions are sent. |

### 3. Stripe

1. In Stripe Dashboard, create a **Product** (e.g. “Football Evaluation - $149”) and a **Price**. Copy the **Price ID** (`price_xxx`) into `STRIPE_PRICE_ID`.
2. No Payment Link needed; checkout is created by POST `/api/checkout`. Success URL is set in code to `${NEXT_PUBLIC_APP_URL}/questionnaire?session_id={CHECKOUT_SESSION_ID}`.

### 4. Resend

1. Sign up at [resend.com](https://resend.com), get an API key, add to `RESEND_API_KEY`.
2. Verify your domain and set `RESEND_FROM_EMAIL` (e.g. `noreply@yourdomain.com`).

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use the Services page to go through checkout (Stripe test card `4242 4242 4242 4242`). After payment you’re redirected to `/questionnaire?session_id=...` to complete the form. When they submit, you get an email with the answers.

## Vercel deployment

1. Connect the repo to Vercel and deploy.
2. In Vercel → Project → **Settings → Environment Variables**, add:

| Name | Value |
|------|--------|
| `NEXT_PUBLIC_APP_URL` | `https://yourdomain.com` |
| `STRIPE_SECRET_KEY` | From Stripe Dashboard |
| `STRIPE_PRICE_ID` | Your evaluation price ID |
| `RESEND_API_KEY` | From Resend |
| `RESEND_FROM_EMAIL` | `noreply@yourdomain.com` (verified in Resend) |
| `ADMIN_NOTIFY_EMAIL` | Your email (where you receive submissions) |

3. Redeploy after saving env vars.

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home |
| `/about` | About |
| `/services` | Services and pricing; “Get Started” creates Stripe Checkout and redirects |
| `/faq` | FAQ |
| `/questionnaire?session_id=...` | Questionnaire form (gated: paid session only) |
| `POST /api/checkout` | Creates Stripe Checkout session; returns `{ url }` for redirect |
| `POST /api/questionnaire/submit` | Validates session, emails you the submission + customer confirmation |

## Tech

- **Stripe:** Server-side SDK; Checkout Session with `customer_creation: "always"`, success URL to `/questionnaire?session_id={CHECKOUT_SESSION_ID}`.
- **Resend:** One email to you (form summary + raw JSON); one to the customer (“We received your questionnaire” + resume link). No database.
