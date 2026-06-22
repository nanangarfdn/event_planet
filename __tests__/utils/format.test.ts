import {
  formatCredits,
  formatPrice,
  formatSlots,
} from '../../src/utils/format';

describe('format helpers', () => {
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
});
