import React from 'react';
import {StyleSheet, View} from 'react-native';
import {colors, radius, spacing} from '../theme';

interface Props {
  count: number;
  active: number; // 0-based
  testID?: string;
}

/** Wizard progress dots. */
export function StepDots({count, active, testID}: Props) {
  return (
    <View style={styles.row} testID={testID}>
      {Array.from({length: count}).map((_, i) => (
        <View key={i} style={[styles.dot, i === active && styles.active]} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {flexDirection: 'row', gap: spacing.sm, justifyContent: 'center'},
  dot: {
    width: 8,
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
  },
  active: {backgroundColor: colors.primary, width: 22},
});
