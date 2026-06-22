import React from 'react';
import {Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import {colors, radius, shadows, spacing} from '../theme';

interface Props {
  children: React.ReactNode;
  onPress?: () => void;
  testID?: string;
  style?: ViewStyle;
}

export function Card({children, onPress, testID, style}: Props) {
  // ponytail: same surface whether tappable or not — branch the wrapper, not the styles.
  if (onPress) {
    return (
      <Pressable
        testID={testID}
        onPress={onPress}
        style={({pressed}) => [styles.card, pressed && styles.pressed, style]}>
        {children}
      </Pressable>
    );
  }
  return (
    <View testID={testID} style={[styles.card, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.bgElevated,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.sm,
    ...shadows.card,
  },
  pressed: {transform: [{scale: 0.985}], opacity: 0.97},
});
