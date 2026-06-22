import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {colors, typography} from '../theme';
import {Gradient} from './Gradient';

interface Props {
  name: string;
  uri?: string;
  size?: number;
  testID?: string;
}

function initials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('');
}

export function Avatar({name, uri, size = 44, testID}: Props) {
  const box = {width: size, height: size, borderRadius: size / 2};
  if (uri) {
    return <Image testID={testID} source={{uri}} style={box} />;
  }
  return (
    <Gradient name="brand" style={[styles.fallback, box]} testID={testID}>
      <Text style={[styles.initials, {fontSize: size * 0.38}]}>
        {initials(name)}
      </Text>
    </Gradient>
  );
}

const styles = StyleSheet.create({
  fallback: {alignItems: 'center', justifyContent: 'center'},
  initials: {...typography.title, color: colors.onPrimary},
});
