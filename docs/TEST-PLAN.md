# Test Plan — Flows & Cases

Covered by automated tests: **unit/component/flow** via Jest + React Native Testing
Library (`__tests__/`, run `npm test`), and **end-to-end** via Maestro flows
(`e2e/`, run on a device/emulator).

## User flows

### 1. Authentication
- **Sign in (per role)** — enter a demo email + `demo1234` → land on Home; role drives
  badge, pax cap, and credits. Empty/partial fields keep Sign in disabled.
- **Register** — name + email → Sign up → Home.

### 2. Discover & join
- **Browse Home** — greeting, balance/joined/hosted stats, category rail, featured +
  upcoming events.
- **Filter (Explore)** — All / Free / Paid / Public / Private chips re-filter the list.
- **Event detail** — open a card → hero, info, organizer.
- **Join** — free event → "You're going 🎉"; paid event → Fiuu payment → success.
- **Enquire** — open chat, send a message; foul words are masked.

### 3. Create event (wizard)
- Details → Type → Pax → (Docs if >50) → Pricing → (Fiuu if paid) → Review → Publish.
- Normal/Merchant blocked above 49 pax; Verified/Admin proceed and hit the Docs step.
- Publish spends 10 credits.

### 4. Credits
- View balance + per-event cost; **Buy 500 / Buy 2,000** top up the balance.

### 5. Profile & verification
- Normal sees "Verify my account" → pay → badge flips to "Verified ✓".
- Verified/Merchant/Admin already show the badge.

### 6. Venues
- Home promo / stat → Venue list → detail → **Use this venue** opens the create wizard.

### 7. Navigation (all interactive elements have an action)
- Bottom tabs (Home/Explore/Create/Credits/Profile) + center Create FAB.
- Home: stat tiles → Credits/Explore/Create; category pills → Explore; "See all" → Explore.

## Case → automation map

| Case | Type | Location |
|------|------|----------|
| Role sign-in (4 roles) + verification badge | flow | `__tests__/qa/roles.qa.test.tsx` |
| Login validation (empty / partial / whitespace) | flow | `__tests__/qa/auth.qa.test.tsx` |
| Buy credits tops up · free-join · use-venue · category/stat nav | flow | `__tests__/qa/interactions.qa.test.tsx` |
| Create wizard (free, gate >49, paid→Fiuu, docs >50) | flow | `__tests__/screens/createWizard.test.tsx`, `qa/createWizard.qa.test.tsx` |
| Enquiry chat foul-word masking | flow | `__tests__/screens/eventDetail.test.tsx`, `qa/chat.qa.test.tsx` |
| Tabs / event detail / credits / profile / venues | flow | `__tests__/navigation/*`, `__tests__/screens/*` |
| Rules / formatting / foul filter | unit | `__tests__/domain/*`, `__tests__/utils/*`, `qa/*` |
| Components (Button/Input/Badge/Avatar/EventCard/Chip) | component | `__tests__/components/*`, `qa/components.qa.test.tsx` |
| End-to-end happy path on device | e2e | `e2e/*.yaml` |

Run: `npm test` (unit/flow) · `npm run tsc` (types) · Maestro for `e2e/`.
