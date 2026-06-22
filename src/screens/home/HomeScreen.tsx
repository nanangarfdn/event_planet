import React from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Avatar, EventCard, Gradient, Screen, SectionHeader} from '../../components';
import {mockEvents} from '../../data/mockEvents';
import {useAuth} from '../../navigation/AuthContext';
import type {AppNav} from '../../navigation/types';
import {colors, radius, shadows, spacing, typography} from '../../theme';

const STATS = (credits: number) => [
  {icon: '💎', value: credits.toLocaleString('en-US'), label: 'Balance'},
  {icon: '🎟', value: '3', label: 'Joined'},
  {icon: '✨', value: '2', label: 'Hosted'},
];

const CATEGORIES = [
  {icon: '🏃', label: 'Run'},
  {icon: '🎨', label: 'Workshop'},
  {icon: '🤝', label: 'Networking'},
  {icon: '🎲', label: 'Social'},
  {icon: '🎵', label: 'Music'},
];

export function HomeScreen() {
  const navigation = useNavigation<AppNav>();
  const {user} = useAuth();
  const [featured, ...rest] = mockEvents;

  return (
    <Screen scroll padded={false}>
      <Gradient name="brand" style={styles.banner}>
        <View style={styles.bannerTop}>
          <View style={styles.flex}>
            <Text style={styles.hi}>Hi, {user.name.split(' ')[0]} 👋</Text>
            <Text style={styles.sub}>Find something great to join</Text>
          </View>
          <Avatar name={user.name} uri={user.avatarUrl} size={48} />
        </View>

        <View style={styles.statRow}>
          {STATS(user.credits).map(s => (
            <View key={s.label} style={styles.statTile}>
              <Text style={styles.statIcon}>{s.icon}</Text>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>
      </Gradient>

      <View style={styles.content}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cats}>
          {CATEGORIES.map(c => (
            <View key={c.label} style={styles.catPill}>
              <Text style={styles.catIcon}>{c.icon}</Text>
              <Text style={styles.catLabel}>{c.label}</Text>
            </View>
          ))}
        </ScrollView>

        <Pressable
          onPress={() => navigation.navigate('Venues')}
          style={({pressed}) => [styles.promo, pressed && styles.promoPressed]}>
          <Text style={styles.promoIcon}>🎁</Text>
          <View style={styles.flex}>
            <Text style={styles.promoTitle}>Venues & deals</Text>
            <Text style={styles.promoSub}>Partner spots with offers</Text>
          </View>
          <Text style={styles.promoChevron}>›</Text>
        </Pressable>

        <SectionHeader title="Featured" subtitle="Hand-picked for you" />
        <EventCard
          event={featured}
          height={220}
          onPress={id => navigation.navigate('EventDetail', {eventId: id})}
        />

        <SectionHeader
          title="Upcoming events"
          subtitle="Happening near you"
          actionLabel="See all"
          onAction={() => navigation.navigate('Main', {screen: 'Explore'} as never)}
        />
        {rest.map(event => (
          <EventCard
            key={event.id}
            event={event}
            onPress={id => navigation.navigate('EventDetail', {eventId: id})}
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  banner: {
    paddingTop: 64,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.lg,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
  },
  bannerTop: {flexDirection: 'row', alignItems: 'center', gap: spacing.md},
  flex: {flex: 1},
  hi: {...typography.h1, color: colors.onPrimary},
  sub: {...typography.body, color: 'rgba(255,255,255,0.82)', marginTop: 2},
  statRow: {flexDirection: 'row', gap: spacing.sm},
  statTile: {
    flex: 1,
    backgroundColor: colors.glass,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    gap: 2,
  },
  statIcon: {fontSize: 18},
  statValue: {...typography.title, color: colors.onPrimary, fontSize: 18},
  statLabel: {...typography.caption, color: 'rgba(255,255,255,0.85)', fontSize: 12},
  content: {padding: spacing.lg, gap: spacing.md},
  cats: {gap: spacing.sm, paddingVertical: 2},
  catPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.bgElevated,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 9,
    ...shadows.sm,
  },
  catIcon: {fontSize: 15},
  catLabel: {...typography.label, color: colors.text, fontSize: 13},
  promo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.primarySoft,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  promoPressed: {opacity: 0.85},
  promoIcon: {fontSize: 24},
  promoTitle: {...typography.title, color: colors.primaryDark},
  promoSub: {...typography.caption, color: colors.primary},
  promoChevron: {...typography.h1, color: colors.primary},
});

