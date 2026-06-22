import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Badge, Card, Screen, SectionHeader} from '../../components';
import {mockVenues} from '../../data/mockVenues';
import type {AppNav} from '../../navigation/types';
import {colors, radius, spacing, typography} from '../../theme';

export function VenueListScreen() {
  const navigation = useNavigation<AppNav>();

  return (
    <Screen scroll>
      <SectionHeader title="Venues & deals" subtitle="Partner spots with offers" />
      {mockVenues.map(venue => (
        <Card
          key={venue.id}
          onPress={() => navigation.navigate('VenueDetail', {venueId: venue.id})}>
          <Image source={{uri: venue.image}} style={styles.thumb} resizeMode="cover" />
          <View style={styles.row}>
            <Text style={styles.name}>{venue.name}</Text>
            {venue.sponsored ? <Badge label="Sponsored" tone="accent" /> : null}
          </View>
          <Text style={styles.meta}>
            {venue.type} · {venue.location}
          </Text>
          <Text style={styles.offer}>🎁 {venue.offer}</Text>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  thumb: {width: '100%', height: 130, borderRadius: radius.md, marginBottom: spacing.xs},
  row: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
  name: {...typography.title, color: colors.text},
  meta: {...typography.caption, color: colors.muted},
  offer: {...typography.body, color: colors.primary},
});
