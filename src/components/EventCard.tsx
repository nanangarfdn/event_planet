import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import type {EventItem} from '../domain/types';
import {formatDateTime, formatPrice, formatSlots} from '../utils/format';
import {colors, radius, shadows, spacing, typography} from '../theme';
import {Gradient} from './Gradient';

interface Props {
  event: EventItem;
  onPress?: (id: string) => void;
  testID?: string;
  height?: number;
}

const SCRIM = ['rgba(20,15,25,0)', 'rgba(20,15,25,0.82)'] as const;

/** Editorial card — title + meta overlaid on a gradient cover with a legibility scrim. */
export function EventCard({event, onPress, testID, height = 188}: Props) {
  const free = event.payment === 'free';
  return (
    <Pressable
      testID={testID}
      onPress={onPress && (() => onPress(event.id))}
      style={({pressed}) => [styles.card, pressed && styles.pressed]}>
      <Gradient name={event.cover} style={[styles.cover, {height}]}>
        <Image
          source={{uri: event.image}}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        />
        <View style={styles.top}>
          <View style={styles.glassChip}>
            <Text style={styles.glassText}>{event.category}</Text>
          </View>
          <View style={[styles.pricePill, free && styles.freePill]}>
            <Text style={[styles.priceText, free && styles.freeText]}>
              {formatPrice(event)}
            </Text>
          </View>
        </View>

        <Gradient colors={SCRIM} start={{x: 0, y: 0}} end={{x: 0, y: 1}} style={styles.scrim} />

        <View style={styles.bottom}>
          <Text style={styles.kicker}>
            {event.type === 'private' ? 'Private' : 'Public'} ·{' '}
            {formatDateTime(event.startDate)}
          </Text>
          <Text style={styles.name} numberOfLines={2}>
            {event.name}
          </Text>
          <Text style={styles.meta}>
            📍  {event.location} · {formatSlots(event)}
          </Text>
        </View>
      </Gradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {borderRadius: radius.lg, overflow: 'hidden', ...shadows.card},
  pressed: {transform: [{scale: 0.985}], opacity: 0.97},
  cover: {padding: spacing.lg, justifyContent: 'flex-start'},
  top: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    zIndex: 2,
  },
  glassChip: {
    backgroundColor: colors.glass,
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
  glassText: {...typography.label, color: colors.onPrimary, fontSize: 12},
  pricePill: {
    backgroundColor: colors.onPrimary,
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    borderRadius: radius.pill,
  },
  freePill: {backgroundColor: colors.success},
  priceText: {...typography.label, color: colors.text, fontSize: 12},
  freeText: {color: colors.onPrimary},
  scrim: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '70%',
  },
  bottom: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing.lg,
    gap: 3,
  },
  kicker: {...typography.label, color: 'rgba(255,255,255,0.85)', fontSize: 12},
  name: {...typography.h1, fontSize: 22, color: colors.onPrimary},
  meta: {...typography.caption, color: 'rgba(255,255,255,0.92)'},
});
