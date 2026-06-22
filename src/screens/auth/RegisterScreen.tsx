import React, {useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Button, Input, Screen} from '../../components';
import {useAuth} from '../../navigation/AuthContext';
import {FREE_CREDITS} from '../../domain/rules';
import {colors, spacing, typography} from '../../theme';

export function RegisterScreen() {
  const {signIn} = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <Screen scroll>
      <Text style={styles.title}>Create your account</Text>
      <Text style={styles.note}>
        Get {FREE_CREDITS.toLocaleString()} free credits on sign-up.
      </Text>
      <Input label="Full name" value={name} onChangeText={setName} />
      <Input
        label="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <Button
        label="Sign up"
        onPress={signIn}
        disabled={!name.trim() || !email.trim()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {...typography.h1, color: colors.text, marginTop: spacing.xl},
  note: {...typography.body, color: colors.muted, marginBottom: spacing.md},
});
