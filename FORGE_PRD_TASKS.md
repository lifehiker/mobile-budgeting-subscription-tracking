# Forge PRD Tasks

Implementation order: foundation -> data/auth -> core workflows -> secondary workflows -> marketing/pages -> deployment -> QA.

## Foundation
- [x] Next.js 15 App Router project with TypeScript.
- [x] Tailwind-based responsive mobile-first styling.
- [x] PWA manifest and icons in `public/`.
- [x] System/CSS fonts only; no `next/font/google`.
- [x] Shared UI primitives and mobile app shell with bottom navigation.

## Data Model
- [x] User profile model with email, base currency, plan, onboarding, and reminder preferences.
- [x] Envelope model with budget, allocation, archive, color, and carryover fields.
- [x] Transaction model with amount, original currency, base amount, exchange rate snapshot, envelope, date, note, and recurring flag.
- [x] Subscription/bill model with name, amount, currency, frequency, next due date, envelope, and reminder preference.
- [x] Rollover record model.
- [x] Local storage persistence fallback for credential-free deploys.
- [x] Free tier limits for envelopes, transactions, subscriptions, and single-currency usage.

## Auth
- [x] Login page for email magic-link style entry.
- [x] Local demo session fallback.
- [x] `/api/auth/magic-link` with validation and missing-provider guard.
- [ ] External email auth delivery requires `RESEND_API_KEY` and production auth wiring.
- [ ] Google OAuth requires provider credentials and production auth wiring.

## User-Facing App Pages
- [x] Homepage/marketing landing page.
- [x] Pricing page.
- [x] Login page.
- [x] Authenticated app layout and dashboard.
- [x] Onboarding flow.
- [x] Envelope management page.
- [x] Fast expense entry page.
- [x] Transactions list and filters page.
- [x] Subscriptions/bills page.
- [x] Reports page.
- [x] Monthly rollover page.
- [x] Settings/profile/reminders/billing/local data page.

## API / Server Actions
- [x] Magic-link request API with graceful fallback.
- [x] Stripe checkout API with graceful fallback.
- [x] Stripe customer portal API with graceful fallback.
- [x] Exchange-rate API with static/cache-safe fallback rates.
- [x] Reminder cron endpoint guarded by optional secret.

## Core Workflows
- [x] Choose base currency and create starter envelopes during onboarding.
- [x] Create, edit, archive, and allocate income to envelopes.
- [x] View envelope remaining balances.
- [x] Add one-time or recurring expenses with note, date, envelope, and currency.
- [x] Store base-currency conversion snapshots.
- [x] Create/delete recurring subscriptions and bills.
- [x] Monthly and annual billing frequency support.
- [x] Upcoming bills list for next 30 days.
- [x] Monthly recurring total calculation.
- [x] Dashboard summary for spent, remaining, upcoming bills, and top envelope spend.
- [x] One-tap rollover with per-envelope carryover control.
- [x] Transaction filters by month, envelope, recurring flag, and currency.
- [x] Reports for budgeted vs spent and recurring charges.

## Secondary Workflows
- [x] Reminder preferences in settings and per-subscription same-day reminder.
- [x] JSON export and demo reset.
- [x] Mock local Pro upgrade fallback.
- [x] PWA metadata and installability assets.

## Billing / Email / Storage Integrations
- [x] Stripe checkout and portal endpoints avoid module-scope SDK initialization.
- [x] Billing fallback keeps the app usable without Stripe credentials.
- [x] Reminder endpoint avoids module-scope email SDK initialization.
- [x] Email fallback keeps auth/reminders usable as local demo without Resend credentials.
- [x] Local storage fallback for persistence where no PostgreSQL/Prisma credentials are available.
- [ ] Production Stripe requires `STRIPE_SECRET_KEY`, `STRIPE_PRICE_PRO_MONTHLY`, and `STRIPE_PRICE_PRO_ANNUAL`.
- [ ] Production transactional email requires `RESEND_API_KEY`.
- [ ] Production database-backed multi-user persistence requires database/auth integration credentials.

## Marketing / SEO Pages
- [x] Homepage optimized for manual budgeting and subscription tracking.
- [x] `/pricing`.
- [x] SEO landing pages for envelope budgeting, subscription tracking, bill reminders, multi-currency budgeting, no-bank-sync budgeting, cash stuffing, expat finance, and Mint alternative.
- [x] Blog route for required launch/content topics.
- [x] App metadata, manifest, and icons.

## Docker / Deploy Config
- [x] `next.config.ts` has `output: "standalone"`.
- [x] Dockerfile uses multi-stage build.
- [x] Dockerfile copies `public/` because it exists in this repository.
- [x] Dockerfile sets `HOSTNAME=0.0.0.0` for container reachability.
- [x] Dockerfile does not require build-time network resources beyond package install.

## Verification
- [x] Run `npm run build`.
- [x] Start production server on alternate port and verify it does not crash.
- [x] Start standalone server with `node .next/standalone/server.js` and verify it serves routes.
- [x] Start dev server on alternate port and verify it does not crash.
- [x] Smoke-test primary routes and fallback APIs.
- [ ] Build Docker image if Docker is available. Docker is installed, but the current user cannot access `/var/run/docker.sock`.
- [x] Create `HUMAN_INPUT_NEEDED.md` for external credentials.
- [x] Create `FORGE_COMPLETION_AUDIT.md`.
