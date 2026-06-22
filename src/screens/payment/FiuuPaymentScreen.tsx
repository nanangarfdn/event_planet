import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {Button, Card, Screen} from '../../components';
import type {AppNav, AppStackParamList} from '../../navigation/types';
import {colors, spacing, typography} from '../../theme';

// ponytail: UI stub — the real Fiuu redirect/webview is wired when the BE exists.
export function FiuuPaymentScreen() {
  const navigation = useNavigation<AppNav>();
  const {params} = useRoute<RouteProp<AppStackParamList, 'FiuuPayment'>>();
  const [paid, setPaid] = useState(false);

  if (paid) {
    return (
      <Screen>
        <View style={styles.center}>
          <Text style={styles.success}>✅ Payment successful</Text>
          <Text style={styles.muted}>You've joined {params.eventName}.</Text>
          <Button label="Back to event" variant="secondary" onPress={() => navigation.goBack()} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <Text style={styles.title}>Fiuu Payment</Text>
      <Card>
        <Text style={styles.row}>{params.eventName}</Text>
        <Text style={styles.amount}>RM {params.amount}</Text>
        <Text style={styles.muted}>Secured by Fiuu payment gateway</Text>
      </Card>
      <Button label={`Pay RM ${params.amount}`} onPress={() => setPaid(true)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {...typography.h1, color: colors.text, marginVertical: spacing.lg},
  row: {...typography.title, color: colors.text},
  amount: {...typography.h1, color: colors.primary},
  muted: {...typography.caption, color: colors.muted},
  center: {flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md},
  success: {...typography.h1, color: colors.success},
});
