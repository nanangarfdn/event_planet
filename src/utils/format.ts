// Small display formatters. ponytail: Intl is built in — no moment/date-fns dependency.
import type {EventItem} from '../domain/types';

const DAY = {weekday: 'short', day: 'numeric', month: 'short'} as const;
const TIME = {hour: '2-digit', minute: '2-digit', hour12: false} as const;

// ponytail: only formatDateTime consumes these — keep them module-local, not API.
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', DAY);
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-GB', TIME);
}

/** "Sat, 5 Jul · 14:00" */
export function formatDateTime(iso: string): string {
  return `${formatDate(iso)} · ${formatTime(iso)}`;
}

export function formatCredits(credits: number): string {
  return `${credits.toLocaleString('en-US')} credits`;
}

/** "Free" or "RM 25" for an event's price. */
export function formatPrice(event: Pick<EventItem, 'payment' | 'priceRM'>): string {
  return event.payment === 'free' ? 'Free' : `RM ${event.priceRM ?? 0}`;
}

export function formatSlots(event: Pick<EventItem, 'pax' | 'joined'>): string {
  return `${event.joined}/${event.pax} joined`;
}
