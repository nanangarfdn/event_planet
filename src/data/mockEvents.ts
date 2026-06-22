import type {EventItem} from '../domain/types';

// ponytail: static seed data for the UI-first build — swapped for an API later.
export const mockEvents: EventItem[] = [
  {
    id: 'e1',
    name: 'Sunset Rooftop Run',
    description: 'A 5km social run ending with skyline views and live music.',
    startDate: '2026-07-05T17:30:00',
    endDate: '2026-07-05T20:00:00',
    location: 'KL Eco City',
    pax: 40,
    joined: 12,
    type: 'public',
    payment: 'free',
    organizer: 'Aisha Rahman',
    cover: 'sunset',
    image:
      'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=900&q=80&auto=format&fit=crop',
    category: 'Run',
  },
  {
    id: 'e2',
    name: 'Indie Founders Mixer',
    description: 'Private networking night for verified entrepreneurs.',
    startDate: '2026-07-12T19:00:00',
    endDate: '2026-07-12T22:00:00',
    location: 'Bangsar South',
    pax: 80,
    joined: 54,
    type: 'private',
    payment: 'paid',
    priceRM: 25,
    organizer: 'Wei Lim',
    cover: 'berry',
    image:
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&q=80&auto=format&fit=crop',
    category: 'Networking',
  },
  {
    id: 'e3',
    name: 'Latte Art Workshop',
    description: 'Hands-on barista session. Free welcome drinks included.',
    startDate: '2026-07-18T10:00:00',
    endDate: '2026-07-18T12:30:00',
    location: 'Damansara Heights',
    pax: 20,
    joined: 8,
    type: 'public',
    payment: 'paid',
    priceRM: 60,
    organizer: 'Brew Lab',
    cover: 'teal',
    image:
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80&auto=format&fit=crop',
    category: 'Workshop',
  },
  {
    id: 'e4',
    name: 'Sunday Board Games',
    description: 'Casual public meet-up. Bring a friend!',
    startDate: '2026-07-19T14:00:00',
    endDate: '2026-07-19T18:00:00',
    location: 'Mont Kiara',
    pax: 30,
    joined: 21,
    type: 'public',
    payment: 'free',
    organizer: 'Aisha Rahman',
    cover: 'sand',
    image:
      'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=900&q=80&auto=format&fit=crop',
    category: 'Social',
  },
];

export function getEvent(id: string): EventItem | undefined {
  return mockEvents.find(e => e.id === id);
}
