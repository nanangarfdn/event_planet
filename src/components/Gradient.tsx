import React from 'react';
import {ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {gradients, type GradientName} from '../theme';

type Point = {x: number; y: number};

interface Props {
  name?: GradientName;
  colors?: readonly string[];
  start?: Point;
  end?: Point;
  style?: ViewStyle | ViewStyle[];
  children?: React.ReactNode;
  testID?: string;
}

/** Gradient fill — diagonal by default; pass start/end for a vertical scrim etc. */
export function Gradient({
  name = 'brand',
  colors,
  start = {x: 0, y: 0},
  end = {x: 1, y: 1},
  style,
  children,
  testID,
}: Props) {
  return (
    <LinearGradient
      testID={testID}
      colors={(colors ?? gradients[name]) as string[]}
      start={start}
      end={end}
      style={style as ViewStyle}>
      {children}
    </LinearGradient>
  );
}
