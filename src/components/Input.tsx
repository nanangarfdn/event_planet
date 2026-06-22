import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import {colors, radius, spacing, typography} from '../theme';

interface Props extends TextInputProps {
  label?: string;
  error?: string;
  helper?: string;
}

export function Input({label, error, helper, style, ...rest}: Props) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={styles.wrap}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor={colors.faint}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[
          styles.input,
          focused && styles.focused,
          !!error && styles.inputError,
          style,
        ]}
        {...rest}
      />
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : helper ? (
        <Text style={styles.helper}>{helper}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {gap: 6},
  label: {
    ...typography.label,
    color: colors.muted,
    fontSize: 12,
    textTransform: 'uppercase',
  },
  input: {
    minHeight: 52,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    color: colors.text,
    backgroundColor: colors.bgElevated,
    ...typography.body,
  },
  focused: {borderColor: colors.primary, backgroundColor: colors.bgElevated},
  inputError: {borderColor: colors.danger},
  error: {...typography.caption, color: colors.danger},
  helper: {...typography.caption, color: colors.faint},
});
