import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors, radius, spacing, typography} from '../theme';

type Tone = 'primary' | 'accent' | 'success' | 'muted' | 'warning' | 'glass';

interface Props {
  label: string;
  tone?: Tone;
  testID?: string;
}

const TONES: Record<Tone, {bg: string; fg: string}> = {
  primary: {bg: colors.primarySoft, fg: colors.primaryDark},
  accent: {bg: colors.accentSoft, fg: '#0E7E72'},
  success: {bg: colors.successSoft, fg: colors.success},
  warning: {bg: '#FBEED2', fg: '#9A6B00'},
  muted: {bg: colors.surfaceAlt, fg: colors.muted},
  glass: {bg: colors.glass, fg: colors.onPrimary},
};

export function Badge({label, tone = 'primary', testID}: Props) {
  const c = TONES[tone];
  return (
    <View testID={testID} style={[styles.badge, {backgroundColor: c.bg}]}>
      <Text style={[styles.text, {color: c.fg}]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
  text: {...typography.label, fontSize: 12},
});
