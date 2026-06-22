import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Avatar, Badge, Button, Card, Gradient, Screen} from '../../components';
import {useAuth} from '../../navigation/AuthContext';
import type {AppNav} from '../../navigation/types';
import {formatCredits} from '../../utils/format';
import {colors, radius, spacing, typography} from '../../theme';

export function ProfileScreen() {
  const navigation = useNavigation<AppNav>();
  const {user, signOut} = useAuth();

  return (
    <Screen scroll padded={false}>
      <Gradient name="plum" style={styles.header}>
        <Avatar name={user.name} uri={user.avatarUrl} size={84} />
        <View style={styles.nameRow}>
          <Text style={styles.name}>{user.name}</Text>
          {user.verified ? <Badge label="Verified ✓" tone="success" /> : null}
        </View>
        <Text style={styles.email}>{user.email}</Text>
        <View style={styles.creditPill}>
          <Text style={styles.creditText}>💎 {formatCredits(user.credits)}</Text>
        </View>
      </Gradient>

      <View style={styles.content}>
        {!user.verified ? (
          <Card>
            <Text style={styles.cardTitle}>Get verified ✦</Text>
            <Text style={styles.muted}>
              Verified accounts get a badge and can host events over 49 pax.
            </Text>
            <Button
              label="Verify my account"
              onPress={() => navigation.navigate('Verify')}
            />
          </Card>
        ) : null}

        <Button label="Log out" variant="ghost" onPress={signOut} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 72,
    paddingBottom: spacing.xl,
    alignItems: 'center',
    gap: spacing.sm,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
  },
  nameRow: {flexDirection: 'row', alignItems: 'center', gap: spacing.sm},
  name: {...typography.h1, fontSize: 24, color: colors.onPrimary},
  email: {...typography.body, color: 'rgba(255,255,255,0.78)'},
  creditPill: {
    backgroundColor: colors.glass,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
    marginTop: spacing.xs,
  },
  creditText: {...typography.label, color: colors.onPrimary, fontSize: 13},
  content: {padding: spacing.lg, gap: spacing.md},
  cardTitle: {...typography.title, color: colors.text},
  muted: {...typography.body, color: colors.muted, lineHeight: 21},
});
