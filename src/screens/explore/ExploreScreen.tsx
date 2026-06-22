import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Chip, EventCard, Screen, SectionHeader} from '../../components';
import {mockEvents} from '../../data/mockEvents';
import type {EventItem} from '../../domain/types';
import type {AppNav} from '../../navigation/types';
import {spacing} from '../../theme';

type Filter = 'All' | 'Free' | 'Paid' | 'Public' | 'Private';
const FILTERS: Filter[] = ['All', 'Free', 'Paid', 'Public', 'Private'];

function matches(event: EventItem, filter: Filter): boolean {
  switch (filter) {
    case 'Free':
      return event.payment === 'free';
    case 'Paid':
      return event.payment === 'paid';
    case 'Public':
      return event.type === 'public';
    case 'Private':
      return event.type === 'private';
    default:
      return true;
  }
}

export function ExploreScreen() {
  const navigation = useNavigation<AppNav>();
  const [filter, setFilter] = useState<Filter>('All');
  const events = mockEvents.filter(e => matches(e, filter));

  return (
    <Screen scroll>
      <SectionHeader title="Explore" subtitle="Find your next event" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filters}>
        {FILTERS.map(f => (
          <Chip
            key={f}
            label={f}
            selected={f === filter}
            onPress={() => setFilter(f)}
          />
        ))}
      </ScrollView>

      {events.length === 0 ? (
        <Text style={styles.empty}>No events match “{filter}”.</Text>
      ) : (
        events.map(event => (
          <EventCard
            key={event.id}
            event={event}
            onPress={id => navigation.navigate('EventDetail', {eventId: id})}
          />
        ))
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  filters: {gap: spacing.sm, paddingVertical: spacing.sm},
  empty: {marginTop: spacing.xl, textAlign: 'center'},
});
