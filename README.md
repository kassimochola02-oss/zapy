# Zap — Smart Digital Payments

A mobile-first fintech super-app for Uganda and, eventually, the world.
Send, receive, pay bills, buy airtime/data, pay merchants, and (in sandbox)
explore international transfers — all in one calm, premium interface.

> **Status: Phase 1.** Demo data only. No real money moves anywhere in this app.
> Payment "success" is always simulated by sandbox providers and clearly labelled.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

No database is required for Phase 1 (demo data is in `src/lib/demo.ts`).
For the ledger schema:

```bash
cp .env.example .env   # fill in DATABASE_URL
npx prisma db push
npm run db:studio
```

## What's implemented (Phase 1)

- **Design system** — Zap palette tokens in `tailwind.config.ts`
  (forest `#218838`, deep `#14652D`, mint `#F0F8F0`, orange `#FF9F1C`,
  charcoal `#202820`, grey `#F4F6F4`, line `#DCEBDD`), rounded cards,
  subtle "zap-lines" flowing-line pattern, reduced-motion support.
- **Brand** — supplied Zap logo at `public/logo.png` on the dashboard header.
- **Home dashboard** — balance card with show/hide, 10 quick actions,
  5-slide promo carousel (auto-advance, swipe, pause-on-hover, indicators,
  honours `prefers-reduced-motion`), recent transactions with
  text+symbol+colour status badges (never colour alone).
- **Navigation** — mobile bottom nav with distinctive centre Scan action.
- **Country selector** — searchable, flag + currency + payment methods per
  country, Uganda live, other markets "Coming soon" (unavailable until
  integrations exist). Switching updates the view, never KYC/home records.
- **Demo transaction flows** — guided Send Money (destination → recipient →
  amount+fees → review → simulated result), Receive (QR-style code + copy/share
  link), Pay Bills (search billers → validate account → pay → receipt),
  Airtime & Data (network auto-detect from number prefix, bundles,
  success/failure simulation), Wallet add/withdraw, Activity search+filters,
  Profile with language selector (en / lg / sw) and settings.
- **Sandbox provider** — `src/services/providers/mockMomo.ts` implements the
  provider adapter interface; amounts ending in `13` simulate a provider
  decline so failure states are testable.
- **API stubs** — `POST /api/send` (validates, honours `Idempotency-Key`
  header) and `GET /api/transactions`.
- **Ledger schema** — `prisma/schema.prisma`: User, Wallet, Transaction
  (immutable double-entry via LedgerEntry, state machine events via TxEvent,
  idempotency key unique constraint, BigInt minor units — no floats).

## Honest limitations

- All balances/transactions are demo data (`src/lib/demo.ts`).
- No live MTN MoMo / Airtel Money / bank integrations — sandbox only.
- No real exchange rates; international transfers are marked Sandbox.
- Crypto wallet module is a navigational placeholder, disabled until
  security + legal + provider review (Phase 6). Never store seed phrases.
- Translations for Luganda/Swahili are samples pending human review.
- Auth/PIN/biometrics are not yet implemented — do not deploy as-is.

## Roadmap (from the master spec)

- **Phase 2** — backend: auth (phone OTP, PIN hash, sessions), Prisma-backed
  wallet + ledger, transaction APIs with authorization & validation, tests.
- **Phase 3** — payment simulations: full happy/failure/retry/duplicate/pending
  journeys against mock providers; receipts; reconciliation jobs.
- **Phase 4** — live providers (official MTN MoMo, Airtel Money, banks),
  webhook signature verification, replay protection, certification.
- **Phase 5** — country & language expansion via `src/lib/countries.ts` +
  `locales/`.
- **Phase 6** — crypto connectivity (non-custodial first) behind a feature flag.
- **Phase 7** — testing, security & accessibility audits, deployment, monitoring.

## Extending

- **New country** — add an entry to `COUNTRIES` in `src/lib/countries.ts`
  (mark `live: false` until integrations + approvals exist).
- **New provider** — implement the `MomoProvider` interface in
  `src/services/providers/` and register it in the payment router (Phase 2/4).
- **New language** — add `locales/<code>/common.json`; English is the fallback.
- **Never** commit live credentials; use `.env` + a secrets manager.
