# Roles & Demo Accounts

Sign in with any email below and the shared demo password. Any unknown email
signs in as a **Normal** user.

**Password (all accounts):** `demo1234`

| Role | Email | Badge | Pax cap | Starting credits | Focus |
|------|-------|-------|---------|------------------|-------|
| Normal | `normal@eventplanet.app` | — | 49 | 1,000 | Join & create small events |
| Verified | `verified@eventplanet.app` | ✓ | unlimited | 1,000 | Business / org, large events |
| Merchant | `merchant@eventplanet.app` | ✓ | 49 | 1,000 | Venue & sponsor provider |
| Admin | `admin@eventplanet.app` | ✓ | unlimited | 9,999 | Full access (usually monitored on web) |

Source of truth: [`src/data/demoAccounts.ts`](../src/data/demoAccounts.ts).

## Conditions / business rules

Encoded as pure functions in [`src/domain/rules.ts`](../src/domain/rules.ts):

- **Credits** — every member starts with **1,000** free credits; creating an event costs **10** (`canAffordEvent`).
- **Capacity** — Normal & Merchant can host up to **49** guests; Verified & Admin are **unlimited** (`maxPaxForRole`).
- **Large events** — more than **50** guests require document upload before publishing (`needsDocs`); only Verified/Admin can reach that capacity.
- **Verification** — a Normal user can pay to become **Verified**, which adds the badge and lifts the pax cap.
- **Paid events** — ticketed events collect payment via the Fiuu gateway.
- **Chat moderation** — enquiry messages are passed through a foul-word filter (`src/utils/filterFoulWords.ts`).

## How sign-in resolves a role

`AuthContext.signIn(email)` looks the email up in `demoAccounts`; a match loads that
role's user, anything else loads the default Normal user. See
[`src/navigation/AuthContext.tsx`](../src/navigation/AuthContext.tsx).
