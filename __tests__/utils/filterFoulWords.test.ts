import {filterFoulWords, hasFoulWord} from '../../src/utils/filterFoulWords';

describe('filterFoulWords', () => {
  it('masks a foul word with same-length asterisks', () => {
    expect(filterFoulWords('this is a scam')).toBe('this is a ****');
  });

  it('is case-insensitive', () => {
    expect(filterFoulWords('You IDIOT')).toBe('You *****');
  });

  it('leaves clean text untouched', () => {
    const clean = 'Looking forward to the event!';
    expect(filterFoulWords(clean)).toBe(clean);
    expect(hasFoulWord(clean)).toBe(false);
  });

  it('does not mask substrings inside other words', () => {
    expect(filterFoulWords('shell scrap')).toBe('shell scrap');
  });

  it('flags foul content', () => {
    expect(hasFoulWord('what a scam')).toBe(true);
  });
});
