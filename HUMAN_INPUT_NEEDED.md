# Human Input Needed

The app runs and builds without these values by using local/demo fallbacks. Provide the following only when enabling production integrations.

## Authentication and Email
- `AUTH_SECRET`: Strong random secret for production auth/session signing.
- `RESEND_API_KEY`: Required to send real magic-link, reminder, and transactional emails.
- Google OAuth client ID/secret: Required only if enabling Google sign-in.

## Billing
- `STRIPE_SECRET_KEY`: Required for real Stripe Checkout and customer portal sessions.
- `STRIPE_PRICE_PRO_MONTHLY`: Stripe price ID for the $5.99/month Pro plan.
- `STRIPE_PRICE_PRO_ANNUAL`: Stripe price ID for the $49/year Pro plan.
- Stripe webhook secret: Required if adding production subscription status synchronization.

## Reminder Job
- `REMINDER_JOB_SECRET`: Optional shared secret for protecting `/api/jobs/reminders` when called from Coolify cron or another scheduler.

## Production Persistence
- `DATABASE_URL`: Required if replacing the current local-storage fallback with PostgreSQL/Prisma-backed multi-user persistence.

## App URL
- `NEXT_PUBLIC_APP_URL`: Public production URL, used by auth/email/billing links when production providers are wired.
