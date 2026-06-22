import {
  EVENT_COST,
  FREE_CREDITS,
  canAffordEvent,
  canCreateForPax,
  maxPaxForRole,
  needsDocs,
} from '../../src/domain/rules';

describe('credit system', () => {
  it('grants 1000 free credits and charges 10 per event', () => {
    expect(FREE_CREDITS).toBe(1000);
    expect(EVENT_COST).toBe(10);
  });

  it.each([
    [9, false],
    [10, true],
    [1000, true],
  ])('canAffordEvent(%i) === %s', (credits, expected) => {
    expect(canAffordEvent(credits)).toBe(expected);
  });
});

describe('pax limits by role', () => {
  it('normal users are capped at 49', () => {
    expect(maxPaxForRole('normal')).toBe(49);
    expect(canCreateForPax('normal', 49)).toBe(true);
    expect(canCreateForPax('normal', 50)).toBe(false);
  });

  it('verified users are uncapped', () => {
    expect(maxPaxForRole('verified')).toBe(Infinity);
    expect(canCreateForPax('verified', 500)).toBe(true);
  });

  it('rejects non-positive pax', () => {
    expect(canCreateForPax('verified', 0)).toBe(false);
  });
});

describe('documentation threshold', () => {
  it.each([
    [49, false],
    [50, false],
    [51, true],
  ])('needsDocs(%i) === %s', (pax, expected) => {
    expect(needsDocs(pax)).toBe(expected);
  });
});
