import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Badge, Button, Card, Screen} from '../../components';
import {useAuth} from '../../navigation/AuthContext';
import type {AppNav} from '../../navigation/types';
import {colors, spacing, typography} from '../../theme';

export function VerifyScreen() {
  const navigation = useNavigation<AppNav>();
  const {user, verify} = useAuth();

  if (user.verified) {
    return (
      <Screen>
        <View style={styles.center}>
          <Badge label="Verified ✓" tone="success" />
          <Text style={styles.done}>You're verified!</Text>
          <Button label="Done" variant="secondary" onPress={() => navigation.goBack()} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <Text style={styles.title}>Verify your account</Text>
      <Card>
        <Text style={styles.muted}>One-time fee · RM 50</Text>
        <Text style={styles.body}>Verified perks:</Text>
        <Text style={styles.body}>• Verified badge</Text>
        <Text style={styles.body}>• Host events over 49 pax</Text>
        <Text style={styles.body}>• Priority in Explore</Text>
      </Card>
      <Button label="Pay & verify · RM 50" onPress={verify} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {...typography.h1, color: colors.text, marginVertical: spacing.lg},
  body: {...typography.body, color: colors.text},
  muted: {...typography.body, color: colors.muted},
  center: {flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md},
  done: {...typography.h2, color: colors.text},
});
