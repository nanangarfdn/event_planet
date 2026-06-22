# Event Planet — UI

Event-planning mobile app (React Native). **UI-first, test-driven** build: navigation +
screens + a reusable design system, all backed by mock data. No backend yet.

## Stack
- React Native 0.79 + TypeScript
- React Navigation v7 (native-stack + bottom-tabs)
- Jest + @testing-library/react-native (component + navigation tests, run in Node)
- Custom lightweight design system (own theme tokens — no UI-kit dependency)

## Run
```bash
npm install --legacy-peer-deps   # screens 4.10 pinned for RN 0.79
npm test                         # 45 tests / 15 suites
npm run tsc                      # type-check
npm start                        # Metro (needs an emulator/device to render natively)
```

## Structure
```
src/
  theme/        design tokens (colors, spacing, typography) — imported directly
  components/   reusable DS: Button Card Input Badge Avatar Chip Screen
                SectionHeader StepDots + domain EventCard
  domain/       types.ts + rules.ts (credit/pax/docs business rules, pure)
  utils/        filterFoulWords, format (Intl-based, no date lib)
  navigation/   AuthContext (auth gate state) · RootNavigator · AppTabs · Root
  screens/      auth · home · explore (list+detail) · create (wizard)
                credits · profile (+verify) · venue (list+detail) · chat · payment
  data/         mock events / venues / user
__tests__/      domain · utils · components · navigation · screens(flows)
```

## What's covered by tests
- **Rules** — 1000 free credits, 10/event; normal users capped at 49 pax, verified unlimited;
  >50 pax needs documents; foul-word masking; price/credit/slot formatting.
- **Components** — Button (press/disabled/loading), Input (label/error/change),
  Badge, Avatar (initials fallback), EventCard (name/price/slots/badge/onPress).
- **Navigation** — auth gate (signed-out → Login), Login→Register, sign-in → Home,
  all five tabs, Home → EventDetail.
- **Flows** — create-event wizard (free path → publish; normal user blocked >49 pax;
  paid reveals Fiuu step; verified user >50 pax reveals doc-upload); enquiry chat
  masks foul words; credits balance; verify badge flow; venue browse → detail.

## Design system
Clean modern events theme — white surfaces, violet `#6C4DF2` primary, coral `#FF5A5F`
accent. Screens hold zero hard-coded colors; everything reads from `src/theme`.

## Notes
Built in "ponytail" (lazy-senior-dev / YAGNI) mode — minimum that works, no unrequested
abstraction. Intentional simplifications are tagged with `// ponytail:` comments
(e.g. emoji tab icons instead of a native icon font, single static theme without a
Provider, mock data instead of an API layer). Native build (android/ios) and Maestro
E2E are intentionally out of scope for this UI-first pass.
