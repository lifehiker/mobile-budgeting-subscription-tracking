# EnvelopeFlow

Mobile-first manual envelope budgeting and subscription tracking PWA. The app runs without external services by using browser local storage and guarded API fallbacks for auth, billing, reminders, and exchange rates.

## Tech Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- Recharts
- Lucide React

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Build

```bash
npm run build
npm start
```

The app is configured with `output: "standalone"` for Docker/Coolify deployment.

## Optional Integrations

The app works with no environment variables. Production auth email, Stripe billing, reminder delivery, and exchange-rate provider credentials are documented in `HUMAN_INPUT_NEEDED.md` and `.env.example`.
