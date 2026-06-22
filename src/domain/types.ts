// Core domain types for Event Planet (UI-first — shapes only, no persistence yet).
import type {GradientName} from '../theme';

export type Role = 'normal' | 'verified' | 'merchant' | 'admin';

export type EventType = 'public' | 'private';
export type PaymentType = 'free' | 'paid';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  credits: number;
  verified: boolean;
  avatarUrl?: string;
}

export interface EventItem {
  id: string;
  name: string;
  description: string;
  startDate: string; // ISO
  endDate: string; // ISO
  location: string;
  pax: number; // slots available
  joined: number;
  type: EventType;
  payment: PaymentType;
  priceRM?: number; // when payment === 'paid'
  organizer: string;
  cover: GradientName; // gradient tint shown behind / while the image loads
  image: string; // cover photo (Unsplash)
  category: string; // e.g. Run, Workshop, Networking
}

export interface Venue {
  id: string;
  name: string;
  type: string; // e.g. Restaurant, Cafe, Hall
  location: string;
  offer: string; // e.g. "Free welcome drinks"
  sponsored: boolean;
  image: string; // venue photo (Unsplash)
}

export interface ChatMessage {
  id: string;
  from: 'me' | 'organizer';
  text: string;
}
