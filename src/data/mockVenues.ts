import type {Venue} from '../domain/types';

export const mockVenues: Venue[] = [
  {
    id: 'v1',
    name: 'Brew Lab Coffee',
    type: 'Cafe',
    location: 'Damansara Heights',
    offer: 'Free welcome drinks for groups of 10+',
    sponsored: true,
    image:
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 'v2',
    name: 'The Rooftop Hall',
    type: 'Event Hall',
    location: 'KL Eco City',
    offer: '20% off venue hire on weekdays',
    sponsored: false,
    image:
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 'v3',
    name: 'Garden Bistro',
    type: 'Restaurant',
    location: 'Bangsar',
    offer: 'Complimentary dessert platter',
    sponsored: true,
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80&auto=format&fit=crop',
  },
];

export function getVenue(id: string): Venue | undefined {
  return mockVenues.find(v => v.id === id);
}
