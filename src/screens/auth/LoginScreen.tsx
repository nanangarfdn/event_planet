import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button, Gradient, Input, Screen} from '../../components';
import {useAuth} from '../../navigation/AuthContext';
import type {AuthNav} from '../../navigation/types';
import {colors, radius, spacing, typography} from '../../theme';

export function LoginScreen() {
  const {signIn} = useAuth();
  const navigation = useNavigation<AuthNav>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Screen scroll padded={false}>
      <Gradient name="plum" style={styles.hero}>
        <Text style={styles.logo}>🪐</Text>
        <Text style={styles.brand}>Event Planet</Text>
        <Text style={styles.tagline}>Plan it. Fill it. Live it.</Text>
      </Gradient>

      <View style={styles.form}>
        <Text style={styles.welcome}>Welcome back</Text>
        <Input
          label="Email"
          placeholder="you@example.com"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          label="Password"
          placeholder="••••••••"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button
          label="Sign in"
          onPress={signIn}
          disabled={!email.trim() || !password}
        />
        <Button
          label="Create account"
          variant="ghost"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingTop: 88,
    paddingBottom: spacing.xxl,
    alignItems: 'center',
    gap: spacing.xs,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
  },
  logo: {fontSize: 52, marginBottom: spacing.xs},
  brand: {...typography.display, color: colors.onPrimary},
  tagline: {...typography.body, color: 'rgba(255,255,255,0.78)'},
  form: {padding: spacing.lg, gap: spacing.md, marginTop: spacing.sm},
  welcome: {...typography.h2, color: colors.text, marginBottom: spacing.xs},
});
