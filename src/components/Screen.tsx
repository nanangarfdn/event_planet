import React from 'react';
import {ScrollView, StyleSheet, View, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, spacing} from '../theme';

interface Props {
  children: React.ReactNode;
  scroll?: boolean;
  padded?: boolean;
  testID?: string;
  style?: ViewStyle;
}

/** Safe-area-aware page container. ScrollView when content can overflow. */
export function Screen({children, scroll, padded = true, testID, style}: Props) {
  const insets = useSafeAreaInsets();
  const pad = [
    {paddingTop: insets.top},
    padded && styles.padded,
    style,
  ];

  if (scroll) {
    return (
      <ScrollView
        testID={testID}
        style={styles.fill}
        contentContainerStyle={[styles.scrollContent, pad]}
        keyboardShouldPersistTaps="handled">
        {children}
      </ScrollView>
    );
  }
  return (
    <View testID={testID} style={[styles.fill, pad]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {flex: 1, backgroundColor: colors.bg},
  padded: {paddingHorizontal: spacing.lg},
  scrollContent: {paddingBottom: spacing.xxl, gap: spacing.md},
});
