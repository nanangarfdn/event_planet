import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import {colors, gradients, radius, shadows, spacing, typography} from '../theme';
import {Gradient} from './Gradient';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

interface Props {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  testID?: string;
  style?: ViewStyle;
}

const FG: Record<Variant, string> = {
  primary: colors.onPrimary,
  secondary: colors.text,
  ghost: colors.primary,
  danger: colors.onPrimary,
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled,
  loading,
  testID,
  style,
}: Props) {
  const blocked = disabled || loading;
  const gradient = variant === 'primary' || variant === 'danger';

  const inner = loading ? (
    <ActivityIndicator color={FG[variant]} />
  ) : (
    <Text style={[styles.label, {color: FG[variant]}]}>{label}</Text>
  );

  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{disabled: !!blocked}}
      disabled={blocked}
      onPress={onPress}
      style={({pressed}) => [
        styles.shadow,
        !gradient && styles.flat,
        variant === 'secondary' && styles.secondary,
        variant === 'ghost' && styles.ghost,
        blocked && styles.blocked,
        pressed && !blocked && styles.pressed,
        style,
      ]}>
      {gradient ? (
        <Gradient
          colors={variant === 'danger' ? gradients.danger : gradients.brand}
          style={styles.base}>
          {inner}
        </Gradient>
      ) : (
        <View style={styles.base}>{inner}</View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  shadow: {borderRadius: radius.lg, ...shadows.button},
  base: {
    minHeight: 54,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  flat: {shadowOpacity: 0, elevation: 0},
  secondary: {backgroundColor: colors.surfaceAlt},
  ghost: {backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.primary},
  blocked: {opacity: 0.4},
  pressed: {transform: [{scale: 0.98}], opacity: 0.92},
  label: {...typography.title, fontSize: 16},
});
