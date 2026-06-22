// Requirement: enquiry chat must filter foul words.
// ponytail: tiny built-in list + regex; a moderation service is YAGNI for UI-first.
const FOUL_WORDS = ['damn', 'hell', 'crap', 'idiot', 'stupid', 'scam'];

const PATTERN = new RegExp(`\\b(${FOUL_WORDS.join('|')})\\b`, 'gi');

/** Replace each foul word with asterisks of the same length. */
export function filterFoulWords(text: string): string {
  return text.replace(PATTERN, match => '*'.repeat(match.length));
}

export function hasFoulWord(text: string): boolean {
  return filterFoulWords(text) !== text;
}
