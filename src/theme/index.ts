// ponytail: one static theme object, imported directly. No Provider/Context until
// a second theme (dark mode) actually exists — that would be YAGNI today.
import {colors, gradients} from './colors';
import {spacing, radius} from './spacing';
import {typography} from './typography';
import {shadows} from './shadows';

export const theme = {colors, gradients, spacing, radius, typography, shadows} as const;

export type Theme = typeof theme;
export {colors, gradients, spacing, radius, typography, shadows};
export type {GradientName} from './colors';
