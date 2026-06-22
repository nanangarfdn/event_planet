import type {TextStyle} from 'react-native';

export const typography: Record<
  'display' | 'h1' | 'h2' | 'title' | 'body' | 'label' | 'caption',
  TextStyle
> = {
  display: {fontSize: 34, fontWeight: '800', letterSpacing: -0.6},
  h1: {fontSize: 27, fontWeight: '800', letterSpacing: -0.4},
  h2: {fontSize: 21, fontWeight: '700', letterSpacing: -0.2},
  title: {fontSize: 16, fontWeight: '700'},
  body: {fontSize: 15, fontWeight: '400'},
  label: {fontSize: 13, fontWeight: '700', letterSpacing: 0.2},
  caption: {fontSize: 13, fontWeight: '500'},
};
