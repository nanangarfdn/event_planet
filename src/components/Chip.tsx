import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {colors, radius, shadows, spacing, typography} from '../theme';

interface Props {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  testID?: string;
}

/** Selectable filter pill (used by Explore filters + wizard choices). */
export function Chip({label, selected, onPress, testID}: Props) {
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{selected: !!selected}}
      onPress={onPress}
      style={[styles.chip, selected ? styles.selected : styles.idle]}>
      <Text style={[styles.label, selected && styles.labelSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: 10,
    borderRadius: radius.pill,
  },
  idle: {
    backgroundColor: colors.bgElevated,
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  selected: {backgroundColor: colors.primary, ...shadows.sm},
  label: {...typography.label, fontSize: 13, color: colors.muted},
  labelSelected: {color: colors.onPrimary},
});
