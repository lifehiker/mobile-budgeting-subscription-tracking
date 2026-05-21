# Human Input Needed

The app runs without external credentials using local/mock fallbacks. Provide these values for production integrations:

## Authentication and Magic Links
- `AUTH_SECRET`: strong random secret for Auth.js/NextAuth.
- Google OAuth client ID/secret if Google sign-in is enabled.
- Production database URL if replacing local browser storage with Prisma/PostgreSQL.

## Email
- `RESEND_API_KEY`: required to send real magic-link, reminder, and upgrade-confirmation emails.
- Verified sender domain/address in Resend.

## Billing
- `STRIPE_SECRET_KEY`
- `STRIPE_PRICE_PRO_MONTHLY`
- `STRIPE_PRICE_PRO_ANNUAL`
- Stripe webhook signing secret when webhook fulfillment is added.

## Jobs
- `REMINDER_JOB_SECRET`: shared secret for calling `/api/jobs/reminders`.

## Exchange Rates
- Optional exchange-rate provider API key if replacing the committed fallback rate table.
