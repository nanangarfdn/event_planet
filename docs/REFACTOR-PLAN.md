# event_planet — Refactor Plan

Reference app. Already clean (RN 0.79.1, TS strict, 23 tests, 6 e2e). Goal here is
**minimal**: close the standard's lint/typecheck gap and tidy small inconsistencies —
without touching the patterns the other apps will copy.

> No UI/behavior change. This app is a UI-first demo (mock data, `signIn` ignores password — preserve that).

## Refactor steps (ordered, behavior-preserving)

1. **Add ESLint** — create `.eslintrc.js` extending `@react-native` (matches other apps) + `"lint": "eslint ."` script. This is the only structural gap vs the standard.
2. **Add `typecheck` alias** — keep existing `"tsc": "tsc --noEmit"`, add `"typecheck": "tsc --noEmit"` so all apps share the script name.
3. **Run lint, fix what it flags** — expected: nothing major (no `console.log` found in discovery). Any `as never` nav casts — leave them (runtime-correct escape hatch; tightening types risks behavior); add an eslint-disable + `// ponytail:` note naming the ceiling rather than rewriting nav typing. **All 4 cast sites** (critical-review): `HomeScreen.tsx:45,63,93`, `VenueDetailScreen.tsx:34`.
4. **Constant alignment (optional, low value)** — test harness password `secret123` (`renderWithProviders.tsx:15`) ≠ demo password `demo1234` (`demoAccounts.ts:5`). Works only because auth ignores passwords. Leave as-is unless lint/tests demand; document in TEST-PLAN. Do NOT introduce real credential checking (breaks every login test/e2e).

## Do NOT touch (behavior-critical)

- `AuthContext.signIn` email-only semantics + generic-mockUser fallback (e2e asserts `Hi, Adam.*`).
- `TabBar.tsx:20-23` layout math (`Math.max(insets.bottom, …)`, `height:64+bottom`, FAB `marginTop:-28`).
- Hero `paddingTop` literals (status-bar compensation), scrim/overlay gradient z-order, `Pressable` scale transforms.
- `getEvent` undefined-guards in EventDetail/EnquiryChat.
- iOS `shadow*` + Android `elevation` dual shadow (don't collapse to one prop).
- `react-native-screens` jest mock + `enableScreens` stub.

## Gate

`npm run lint` clean · `npm run typecheck` clean · `npm test` (23 files) green · smoke green · e2e 6 flows green (non-headless).
