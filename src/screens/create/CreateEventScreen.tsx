import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Badge, Button, Card, Chip, Input, Screen, StepDots} from '../../components';
import {
  EVENT_COST,
  canAffordEvent,
  canCreateForPax,
  maxPaxForRole,
  needsDocs,
} from '../../domain/rules';
import type {EventType, PaymentType} from '../../domain/types';
import {useAuth} from '../../navigation/AuthContext';
import {colors, spacing, typography} from '../../theme';

type StepKey = 'details' | 'type' | 'pax' | 'docs' | 'payment' | 'fiuu' | 'review';

const TITLES: Record<StepKey, string> = {
  details: 'Event details',
  type: 'Who can join?',
  pax: 'How many slots?',
  docs: 'Upload documents',
  payment: 'Pricing',
  fiuu: 'Connect payout',
  review: 'Review & publish',
};

// Docs step only when over the threshold; Fiuu step only when the event is paid.
function buildSteps(pax: number, payment: PaymentType): StepKey[] {
  const steps: StepKey[] = ['details', 'type', 'pax'];
  if (needsDocs(pax)) {
    steps.push('docs');
  }
  steps.push('payment');
  if (payment === 'paid') {
    steps.push('fiuu');
  }
  steps.push('review');
  return steps;
}

export function CreateEventScreen() {
  const {user, spendCredits} = useAuth();
  const [index, setIndex] = useState(0);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState<EventType>('public');
  const [paxText, setPaxText] = useState('');
  const [payment, setPayment] = useState<PaymentType>('free');
  const [priceText, setPriceText] = useState('');
  const [docsUploaded, setDocsUploaded] = useState(false);
  const [fiuuConnected, setFiuuConnected] = useState(false);
  const [published, setPublished] = useState(false);

  const pax = parseInt(paxText, 10) || 0;
  const price = parseInt(priceText, 10) || 0;
  const steps = buildSteps(pax, payment);
  const i = Math.min(index, steps.length - 1);
  const step = steps[i];
  const overCap = pax > maxPaxForRole(user.role);

  const canNext: Record<StepKey, boolean> = {
    details: name.trim().length > 0 && location.trim().length > 0,
    type: true,
    pax: canCreateForPax(user.role, pax),
    docs: docsUploaded,
    payment: payment === 'free' || price > 0,
    fiuu: fiuuConnected,
    review: true,
  };

  const publish = () => {
    spendCredits(EVENT_COST);
    setPublished(true);
  };

  if (published) {
    return (
      <Screen>
        <View style={styles.center}>
          <Text style={styles.success}>🎉 Event published!</Text>
          <Text style={styles.muted}>“{name}” is now live.</Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <StepDots count={steps.length} active={i} />
      <Text style={styles.heading}>{TITLES[step]}</Text>

      {step === 'details' && (
        <>
          <Input label="Event name" value={name} onChangeText={setName} />
          <Input label="Location" value={location} onChangeText={setLocation} />
        </>
      )}

      {step === 'type' && (
        <View style={styles.choices}>
          <Chip label="Public" selected={type === 'public'} onPress={() => setType('public')} />
          <Chip label="Private (invite only)" selected={type === 'private'} onPress={() => setType('private')} />
        </View>
      )}

      {step === 'pax' && (
        <>
          <Input
            label="Number of slots"
            keyboardType="number-pad"
            value={paxText}
            onChangeText={setPaxText}
            error={overCap ? 'Verified account required for 50+ pax' : undefined}
            helper={`Your limit: ${maxPaxForRole(user.role) === Infinity ? 'unlimited' : maxPaxForRole(user.role)} pax`}
          />
          {needsDocs(pax) && !overCap ? (
            <Badge label="Large event — documents needed next" tone="warning" />
          ) : null}
        </>
      )}

      {step === 'docs' && (
        <Card>
          <Text style={styles.muted}>
            Events over 50 pax must upload supporting documents before approval.
          </Text>
          <Button
            label={docsUploaded ? 'Document attached ✓' : 'Upload document'}
            variant={docsUploaded ? 'secondary' : 'primary'}
            onPress={() => setDocsUploaded(true)}
          />
        </Card>
      )}

      {step === 'payment' && (
        <>
          <View style={styles.choices}>
            <Chip label="Free" selected={payment === 'free'} onPress={() => setPayment('free')} />
            <Chip label="Paid" selected={payment === 'paid'} onPress={() => setPayment('paid')} />
          </View>
          {payment === 'paid' ? (
            <Input
              label="Ticket price (RM)"
              keyboardType="number-pad"
              value={priceText}
              onChangeText={setPriceText}
            />
          ) : null}
        </>
      )}

      {step === 'fiuu' && (
        <Card>
          <Text style={styles.muted}>
            Paid events collect payments via the Fiuu gateway.
          </Text>
          <Button
            label={fiuuConnected ? 'Fiuu connected ✓' : 'Connect Fiuu gateway'}
            variant={fiuuConnected ? 'secondary' : 'primary'}
            onPress={() => setFiuuConnected(true)}
          />
        </Card>
      )}

      {step === 'review' && (
        <Card>
          <Text style={styles.row}>📛 {name || '—'}</Text>
          <Text style={styles.row}>📍 {location || '—'}</Text>
          <Text style={styles.row}>👥 {pax} pax · {type}</Text>
          <Text style={styles.row}>
            💳 {payment === 'paid' ? `RM ${price}` : 'Free'}
          </Text>
          <Text style={styles.cost}>Costs {EVENT_COST} credits to publish</Text>
          {!canAffordEvent(user.credits) ? (
            <Text style={styles.error}>Not enough credits.</Text>
          ) : null}
        </Card>
      )}

      <View style={styles.nav}>
        {i > 0 ? (
          <Button label="Back" variant="secondary" onPress={() => setIndex(i - 1)} style={styles.flex} />
        ) : null}
        {step === 'review' ? (
          <Button
            label={`Publish · ${EVENT_COST} credits`}
            onPress={publish}
            disabled={!canAffordEvent(user.credits)}
            style={styles.flex}
          />
        ) : (
          <Button
            label="Next"
            onPress={() => setIndex(i + 1)}
            disabled={!canNext[step]}
            style={styles.flex}
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: {...typography.h2, color: colors.text, marginVertical: spacing.md},
  choices: {flexDirection: 'row', gap: spacing.sm, flexWrap: 'wrap'},
  nav: {flexDirection: 'row', gap: spacing.md, marginTop: spacing.xl},
  flex: {flex: 1},
  row: {...typography.body, color: colors.text},
  cost: {...typography.title, color: colors.primary, marginTop: spacing.sm},
  error: {...typography.caption, color: colors.danger},
  muted: {...typography.body, color: colors.muted},
  center: {flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.sm},
  success: {...typography.h1, color: colors.success},
});
