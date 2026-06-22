import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button, Gradient, Screen, SectionHeader} from '../../components';
import {EVENT_COST, canAffordEvent} from '../../domain/rules';
import {useAuth} from '../../navigation/AuthContext';
import {formatCredits} from '../../utils/format';
import {colors, radius, shadows, spacing, typography} from '../../theme';

export function CreditsScreen() {
  const {user} = useAuth();
  const affordable = canAffordEvent(user.credits);

  return (
    <Screen scroll>
      <SectionHeader title="Credits" subtitle="Spend credits to create events" />

      <Gradient name="plum" style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Your balance</Text>
        <Text style={styles.balance}>{formatCredits(user.credits)}</Text>
        <View style={styles.rateRow}>
          <Text style={styles.rate}>Each event costs {EVENT_COST} credits</Text>
        </View>
        {!affordable ? (
          <Text style={styles.warn}>Top up to create your next event.</Text>
        ) : null}
      </Gradient>

      <Text style={styles.packTitle}>Top up</Text>
      <View style={styles.packs}>
        <Button label="Buy 500 credits · RM 5" variant="secondary" />
        <Button label="Buy 2,000 credits · RM 18" variant="secondary" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  balanceCard: {
    borderRadius: radius.lg,
    padding: spacing.xl,
    gap: spacing.xs,
    marginTop: spacing.md,
    ...shadows.card,
  },
  balanceLabel: {...typography.label, color: 'rgba(255,255,255,0.7)', fontSize: 12},
  balance: {...typography.display, color: colors.onPrimary},
  rateRow: {marginTop: spacing.sm},
  rate: {...typography.body, color: 'rgba(255,255,255,0.88)'},
  warn: {...typography.caption, color: '#FFD2D2', marginTop: spacing.xs},
  packTitle: {...typography.h2, color: colors.text, marginTop: spacing.xl},
  packs: {gap: spacing.md, marginTop: spacing.sm},
});
