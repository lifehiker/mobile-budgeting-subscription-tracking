# FORGE PRD Tasks

## Phase 1: Foundation
- [x] Scaffold Next.js 15 App Router TypeScript project.
- [x] Configure Tailwind/CSS design system with mobile-first layout and large tap targets.
- [x] Add `output: "standalone"` to Next config.
- [x] Add PWA manifest, icons, metadata, and install prompt surface.
- [x] Define local-first data model types and persistence helpers for users, envelopes, transactions, subscriptions, exchange rates, reminders, billing status, and monthly rollovers.

## Phase 2: Data Model and Auth
- [x] Implement demo-safe passwordless email sign-in UI and local session state.
- [x] Add guarded magic-link API route with email-provider fallback.
- [x] Add onboarding state for base currency and starter envelopes.
- [x] Enforce free-tier limits locally: 5 envelopes, 20 transactions/month, 3 subscriptions, one currency.
- [x] Document credential needs for production auth/email in `HUMAN_INPUT_NEEDED.md`.

## Phase 3: Core Workflows
- [x] Dashboard with this month spent, remaining total budget, upcoming bills, and top envelopes by spend.
- [x] Onboarding flow: choose base currency, select 3-8 templates, set monthly budgets.
- [x] Envelope CRUD: create, edit, archive, planned monthly amount, current remaining balance, manual income allocation.
- [x] Expense entry flow under 10 seconds: amount, currency, date, envelope, merchant/label, optional note, one-time/recurring flag, converted base amount.
- [x] Transaction list with filters: month, envelope, recurring vs one-time, currency.
- [x] Subscription/bill CRUD: name, amount, currency, monthly/annual frequency, next due date, envelope.
- [x] Upcoming charges list for next 30 days and monthly recurring total.

## Phase 4: Secondary Workflows
- [x] Bill reminder preferences: 3-day and optional same-day reminders.
- [x] Guarded reminder job endpoint with Resend fallback behavior.
- [x] Multi-currency exchange-rate snapshot fallback and conversion logic.
- [x] Monthly reset workflow with one-tap rollover and per-envelope carryover.
- [x] Simple reports: budgeted vs spent by envelope and recurring charges by month.
- [x] Settings page for profile, currency, reminders, subscription status, and data reset/export controls.

## Phase 5: Billing, Email, Storage Integrations
- [x] Pricing UI with Free and Pro monthly/annual tiers, annual default, trial messaging.
- [x] Guarded Stripe Checkout API route with mock upgrade fallback.
- [x] Guarded Stripe portal API route with mock fallback.
- [x] Upgrade confirmation surface and billing status handling.
- [x] Local storage fallback for all core data when database credentials are absent.

## Phase 6: Marketing and SEO Pages
- [x] Homepage for manual envelope budgeting + subscription tracking without bank sync.
- [x] Pricing page.
- [x] SEO feature pages: envelope budget, subscription tracker, bill reminder, multi-currency budget, budget app no bank sync, cash stuffing, expat finance, mint alternative.
- [x] Blog/article pages for PRD topics.
- [x] FAQ schema or structured FAQ content on marketing pages.

## Phase 7: Docker and Deploy Config
- [x] Production-ready Dockerfile for Next standalone output.
- [x] `.dockerignore` suitable for npm/Next builds.
- [x] Ensure Dockerfile only copies directories that exist.

## Phase 8: Verification
- [ ] Run `npm run build` and fix errors.
- [ ] Start dev server and verify it does not crash.
- [ ] Smoke-test primary routes.
- [ ] Visually review pages/components for mobile and desktop polish.
- [ ] Test interactive forms, navigation, filters, rollover, upgrade fallback, and install prompt.
- [ ] Run `docker build .` if Docker is available.
- [x] Create `FORGE_COMPLETION_AUDIT.md` mapping PRD requirements to implementation files/routes.
