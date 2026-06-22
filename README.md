# Event Planet

A mobile app for discovering, creating, and joining events. Built with React Native.

## Features

- **Discover events** — browse a feed of upcoming events with filters (free/paid, public/private) and category rails.
- **Create events** — a guided wizard for event details, audience (public / invite-only), capacity, pricing, and supporting documents for large events.
- **Credit system** — every member starts with 1,000 free credits; creating an event costs 10.
- **Roles** — normal members can host events up to 49 guests; verified members (with a badge) can host larger events.
- **Paid events** — ticketed events collect payment through a payment gateway.
- **Venues & deals** — browse partner venues and their offers.
- **Enquiry chat** — message event organizers, with automatic foul-word filtering.
- **Profile & verification** — manage your account and upgrade to a verified badge.

## Tech

- React Native 0.79 + TypeScript
- React Navigation (native stack + bottom tabs)
- A custom design system: theme tokens, gradients, reusable components, and an SVG icon set
- Jest + React Native Testing Library

## Project structure

```
src/
  theme/        design tokens (colors, spacing, typography, shadows)
  components/   reusable UI (Button, Card, Input, Badge, Avatar, EventCard, Icon, …)
  domain/       types + business rules (credits, capacity, document thresholds)
  utils/        formatting + content moderation helpers
  navigation/   auth gate, bottom tabs, stacks
  screens/      auth · home · explore · event detail · create · credits ·
                profile · venues · chat · payment
  data/         mock events, venues, and user
__tests__/      unit, component, navigation, and flow tests
```

## Getting started

```bash
npm install
npm start            # start the bundler

# in a second terminal
npm run android      # or: npm run ios
```

## Testing

```bash
npm test             # run the test suite
npm run tsc          # type-check
```

## Status

UI-first build backed by mock data. Screens, navigation, the design system, and the
full test suite are in place; backend integration is the next step.
