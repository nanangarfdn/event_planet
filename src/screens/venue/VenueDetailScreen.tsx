import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {Badge, Button, Card, Screen} from '../../components';
import {getVenue} from '../../data/mockVenues';
import type {AppNav, AppStackParamList} from '../../navigation/types';
import {colors, radius, spacing, typography} from '../../theme';

export function VenueDetailScreen() {
  const navigation = useNavigation<AppNav>();
  const {params} = useRoute<RouteProp<AppStackParamList, 'VenueDetail'>>();
  const venue = getVenue(params.venueId);

  if (!venue) {
    return (
      <Screen>
        <Text style={styles.title}>Venue not found</Text>
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <Image source={{uri: venue.image}} style={styles.hero} resizeMode="cover" />
      <Text style={styles.title}>{venue.name}</Text>
      {venue.sponsored ? <Badge label="Sponsored" tone="accent" /> : null}
      <Card>
        <Text style={styles.row}>🏷 {venue.type}</Text>
        <Text style={styles.row}>📍 {venue.location}</Text>
        <Text style={styles.offer}>🎁 {venue.offer}</Text>
      </Card>
      <Button
        label="Use this venue"
        onPress={() => navigation.navigate('Main', {screen: 'Create'} as never)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {width: '100%', height: 200, borderRadius: radius.lg, marginTop: spacing.md},
  title: {...typography.h1, color: colors.text, marginVertical: spacing.md},
  row: {...typography.body, color: colors.text},
  offer: {...typography.body, color: colors.primary},
});
