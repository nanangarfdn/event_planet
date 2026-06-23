import {
  formatCredits,
  formatDateTime,
  formatPrice,
  formatSlots,
} from '../../src/utils/format';

describe('format helpers', () => {
  // --- happy ---
  it('formats credits with thousands separator', () => {
    expect(formatCredits(1000)).toBe('1,000 credits');
  });

  it('shows Free for free events', () => {
    expect(formatPrice({payment: 'free'})).toBe('Free');
  });

  it('shows RM price for paid events', () => {
    expect(formatPrice({payment: 'paid', priceRM: 25})).toBe('RM 25');
  });

  it('formats joined slots', () => {
    expect(formatSlots({pax: 40, joined: 12})).toBe('12/40 joined');
  });

  // TZ-robust: assert shape, not exact value (toLocale* is timezone-dependent)
  it('formats a datetime as "Day, D Mon · HH:MM"', () => {
    expect(formatDateTime('2025-07-05T14:00:00Z')).toMatch(
      /^\w{3},? \d{1,2} \w{3} · \d{2}:\d{2}$/,
    );
  });

  // --- negative / edge ---
  it('formats zero credits', () => {
    expect(formatCredits(0)).toBe('0 credits');
  });

  it('formats negative credits without crashing', () => {
    expect(formatCredits(-50)).toBe('-50 credits');
  });

  it('falls back to RM 0 when a paid event has no priceRM', () => {
    expect(formatPrice({payment: 'paid'})).toBe('RM 0');
  });

  it('handles a full event (joined === pax)', () => {
    expect(formatSlots({pax: 10, joined: 10})).toBe('10/10 joined');
  });

  it('renders Invalid Date for a bad ISO string instead of throwing', () => {
    expect(formatDateTime('not-a-date')).toBe('Invalid Date · Invalid Date');
  });
});
