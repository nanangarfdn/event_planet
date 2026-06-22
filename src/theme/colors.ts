// Researched "events" palette — grounded in color-hex Event App Color Palette
// (#e14658 coral · #3f3250 plum · #22252c charcoal · #c0b3a0 warm sand) and the
// 2025 trend toward warm off-white neutrals + coral primary + a cool teal balance.
// Source: https://www.color-hex.com/color-palette/24542
export const colors = {
  bg: '#F8F6F1', // warm off-white ("Cloud Dancer"-style), not cold white
  bgElevated: '#FFFFFF',
  surface: '#F1EDE5',
  surfaceAlt: '#E9E3D8', // warm sand tint
  primary: '#E14658', // coral — signature events accent / CTA
  primaryDark: '#C23A4A',
  primarySoft: '#FBE4E6',
  accent: '#14B8A6', // teal — cool counterbalance
  accentSoft: '#D6F2EE',
  plum: '#3F3250', // deep brand anchor (hero panels, dark text accents)
  text: '#22252C', // charcoal
  muted: '#6B6675',
  faint: '#9A95A3',
  border: '#E7E0D5', // warm hairline
  hairline: '#F0EBE2',
  success: '#15A06E',
  successSoft: '#DCF1E8',
  danger: '#D14343',
  warning: '#E8A13A',
  onPrimary: '#FFFFFF',
  overlay: 'rgba(34,37,44,0.20)',
  glass: 'rgba(255,255,255,0.24)',
} as const;

// Gradient pairs (used by LinearGradient). [start, end] — all derived from the palette.
export const gradients = {
  brand: ['#FF6F61', '#E14658'] as const, // warm coral
  plum: ['#4A3A63', '#2D2640'] as const, // deep premium hero
  teal: ['#2BC0B3', '#129B96'] as const,
  sunset: ['#FFB36B', '#FF7E6B'] as const,
  sand: ['#F4C58A', '#E89B5B'] as const,
  berry: ['#7A5C97', '#3F3250'] as const,
  danger: ['#E36A5B', '#C0392B'] as const,
} as const;

export type Colors = typeof colors;
export type GradientName = keyof typeof gradients;
