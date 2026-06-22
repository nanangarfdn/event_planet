import {filterFoulWords, hasFoulWord} from '../../src/utils/filterFoulWords';
import {formatPrice} from '../../src/utils/format';

describe('QA · foul-word filter edge cases', () => {
  it('masks multiple foul words in one message', () => {
    expect(filterFoulWords('scam and crap')).toBe('**** and ****');
  });

  it('masks a foul word next to punctuation', () => {
    expect(filterFoulWords('what a scam!')).toBe('what a ****!');
  });

  it('is fully case-insensitive', () => {
    expect(filterFoulWords('SCAM')).toBe('****');
    expect(hasFoulWord('ScAm')).toBe(true);
  });

  it('does not flag clean text', () => {
    expect(hasFoulWord('great event, thanks!')).toBe(false);
  });
});

describe('QA · price formatting edge cases', () => {
  it('paid event missing a price falls back to RM 0', () => {
    expect(formatPrice({payment: 'paid'})).toBe('RM 0');
  });
});
