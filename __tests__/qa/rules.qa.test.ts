import {
  canAffordEvent,
  canCreateForPax,
  maxPaxForRole,
  needsDocs,
} from '../../src/domain/rules';

describe('QA · rules negative & edge cases', () => {
  it('merchant role is capped like a normal user', () => {
    expect(maxPaxForRole('merchant')).toBe(49);
    expect(canCreateForPax('merchant', 50)).toBe(false);
  });

  it('rejects zero and negative pax for any role', () => {
    expect(canCreateForPax('normal', 0)).toBe(false);
    expect(canCreateForPax('normal', -5)).toBe(false);
    expect(canCreateForPax('verified', 0)).toBe(false);
  });

  it('rejects affordability at and below zero credits', () => {
    expect(canAffordEvent(0)).toBe(false);
    expect(canAffordEvent(-100)).toBe(false);
  });

  it('does not require docs at or below the threshold', () => {
    expect(needsDocs(0)).toBe(false);
    expect(needsDocs(50)).toBe(false);
    expect(needsDocs(51)).toBe(true);
  });
});
