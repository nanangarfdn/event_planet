import type {ViewStyle} from 'react-native';

// Soft, brand-tinted elevation. iOS reads shadow*, Android reads elevation.
export const shadows: Record<'sm' | 'card' | 'button' | 'lg', ViewStyle> = {
  sm: {
    shadowColor: '#2A2433',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 3},
    elevation: 2,
  },
  card: {
    shadowColor: '#2A2433',
    shadowOpacity: 0.1,
    shadowRadius: 18,
    shadowOffset: {width: 0, height: 10},
    elevation: 4,
  },
  button: {
    shadowColor: '#C23A4A',
    shadowOpacity: 0.32,
    shadowRadius: 14,
    shadowOffset: {width: 0, height: 8},
    elevation: 7,
  },
  lg: {
    shadowColor: '#2A2433',
    shadowOpacity: 0.16,
    shadowRadius: 28,
    shadowOffset: {width: 0, height: 16},
    elevation: 10,
  },
};
