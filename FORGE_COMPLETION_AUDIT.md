# FORGE Completion Audit

This audit is completed after implementation and verification. It maps the PRD to concrete app files.

## Foundation
- Next.js App Router, TypeScript, Tailwind, standalone output: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts`.
- PWA manifest and icons: `public/manifest.webmanifest`, `public/icons/icon-192.svg`, `public/icons/icon-512.svg`.
- Mobile-first shell and bottom navigation: `src/components/app-shell.tsx`, `src/app/app/layout.tsx`, `src/app/globals.css`.

## Data Model, Auth, Storage
- Local-first data model: `src/lib/types.ts`, `src/lib/data.ts`, `src/components/app-store.tsx`.
- Demo-safe passwordless login and guarded magic-link route: `src/app/login/page.tsx`, `src/app/api/auth/magic-link/route.ts`.
- Local storage fallback: `src/components/app-store.tsx`.

## Core Product
- Dashboard: `src/app/app/page.tsx`.
- Onboarding: `src/app/app/onboarding/page.tsx`.
- Envelope CRUD, archive, planned amount, allocation, balances: `src/app/app/envelopes/page.tsx`.
- Expense entry with currency conversion snapshot: `src/app/app/add-expense/page.tsx`, `src/lib/currency.ts`.
- Transaction filters: `src/app/app/transactions/page.tsx`.
- Subscription/bill CRUD, recurrence, upcoming bills, monthly recurring total: `src/app/app/subscriptions/page.tsx`, `src/lib/data.ts`.
- Monthly rollover with carryover controls: `src/app/app/rollover/page.tsx`.
- Reports: `src/app/app/reports/page.tsx`.
- Settings: `src/app/app/settings/page.tsx`.

## Integrations and Fallbacks
- Stripe checkout and portal guarded fallback routes: `src/app/api/billing/checkout/route.ts`, `src/app/api/billing/portal/route.ts`.
- Reminder job guarded fallback route: `src/app/api/jobs/reminders/route.ts`.
- Exchange-rate fallback route: `src/app/api/exchange-rate/route.ts`.
- Credential requirements: `HUMAN_INPUT_NEEDED.md`.

## Marketing and SEO
- Homepage: `src/app/page.tsx`.
- Pricing page: `src/app/pricing/page.tsx`.
- SEO feature/comparison pages: `src/app/[slug]/page.tsx`, `src/lib/data.ts`.
- Blog pages: `src/app/blog/[slug]/page.tsx`.
- Shared marketing components: `src/components/marketing.tsx`.

## Deployment
- Production Dockerfile with standalone Next output: `Dockerfile`.
- Docker ignore: `.dockerignore`.

## Deferred External-Credential Items
- Real magic-link email, Google OAuth, Stripe Checkout/customer portal, production database persistence, and Resend reminder delivery require credentials listed in `HUMAN_INPUT_NEEDED.md`.
- The app remains runnable because each external path has a guarded local/mock fallback and all user-facing workflows use browser local storage.
