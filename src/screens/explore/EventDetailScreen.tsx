import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {Avatar, Badge, Button, Card, Gradient, Screen} from '../../components';
import {getEvent} from '../../data/mockEvents';
import type {AppNav, AppStackParamList} from '../../navigation/types';
import {formatDateTime, formatPrice, formatSlots} from '../../utils/format';
import {colors, radius, spacing, typography} from '../../theme';

export function EventDetailScreen() {
  const navigation = useNavigation<AppNav>();
  const {params} = useRoute<RouteProp<AppStackParamList, 'EventDetail'>>();
  const event = getEvent(params.eventId);

  if (!event) {
    return (
      <Screen>
        <Text style={styles.title}>Event not found</Text>
      </Screen>
    );
  }

  const join = () => {
    if (event.payment === 'paid') {
      navigation.navigate('FiuuPayment', {
        amount: event.priceRM ?? 0,
        eventName: event.name,
      });
    }
  };

  return (
    <Screen scroll padded={false}>
      <Gradient name={event.cover} style={styles.hero}>
        <Image
          source={{uri: event.image}}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        />
        <Gradient
          colors={['rgba(20,15,25,0.05)', 'rgba(20,15,25,0.78)']}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          style={StyleSheet.absoluteFillObject}
        />
        <View style={styles.heroContent}>
          <Badge label={event.category} tone="glass" />
          <Text style={styles.heroTitle}>{event.name}</Text>
          <View style={styles.heroRow}>
            <Badge
              label={event.type === 'private' ? 'Private' : 'Public'}
              tone="glass"
            />
            <Badge label={formatPrice(event)} tone="glass" />
          </View>
        </View>
      </Gradient>

      <View style={styles.content}>
        <Text style={styles.body}>{event.description}</Text>

        <Card>
          <View style={styles.line}>
            <Text style={styles.lineIcon}>🗓</Text>
            <Text style={styles.lineText}>{formatDateTime(event.startDate)}</Text>
          </View>
          <View style={styles.line}>
            <Text style={styles.lineIcon}>📍</Text>
            <Text style={styles.lineText}>{event.location}</Text>
          </View>
          <View style={styles.line}>
            <Text style={styles.lineIcon}>👥</Text>
            <Text style={styles.lineText}>{formatSlots(event)}</Text>
          </View>
        </Card>

        <View style={styles.host}>
          <Avatar name={event.organizer} size={44} />
          <View>
            <Text style={styles.hostLabel}>Organized by</Text>
            <Text style={styles.hostName}>{event.organizer}</Text>
          </View>
        </View>

        <Button
          label={event.payment === 'paid' ? `Join · ${formatPrice(event)}` : 'Join event'}
          onPress={join}
        />
        <Button
          label="Enquire organizer"
          variant="secondary"
          onPress={() => navigation.navigate('EnquiryChat', {eventId: event.id})}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    minHeight: 280,
    justifyContent: 'flex-end',
    overflow: 'hidden',
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
  },
  heroContent: {
    paddingTop: 64,
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  heroTitle: {...typography.display, fontSize: 30, color: colors.onPrimary},
  heroRow: {flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xs},
  content: {padding: spacing.lg, gap: spacing.md},
  title: {...typography.h1, color: colors.text, marginTop: spacing.md},
  body: {...typography.body, color: colors.muted, lineHeight: 22},
  line: {flexDirection: 'row', alignItems: 'center', gap: spacing.md},
  lineIcon: {fontSize: 16, width: 22},
  lineText: {...typography.body, color: colors.text},
  host: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.xs,
  },
  hostLabel: {...typography.caption, color: colors.faint},
  hostName: {...typography.title, color: colors.text},
});
