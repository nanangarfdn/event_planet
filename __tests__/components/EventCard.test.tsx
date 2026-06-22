import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {EventCard} from '../../src/components';
import {mockEvents} from '../../src/data/mockEvents';

const paid = mockEvents.find(e => e.payment === 'paid')!;
const free = mockEvents.find(e => e.payment === 'free')!;

describe('EventCard', () => {
  it('shows name, slots and a price for paid events', () => {
    const {getByText} = render(<EventCard event={paid} />);
    expect(getByText(paid.name)).toBeTruthy();
    expect(getByText(`RM ${paid.priceRM}`)).toBeTruthy();
    // meta line carries a location + slots summary (with a leading 📍 icon)
    expect(
      getByText(new RegExp(`${paid.location} · ${paid.joined}/${paid.pax} joined`)),
    ).toBeTruthy();
    expect(getByText(paid.category)).toBeTruthy();
  });

  it('shows "Free" for free events', () => {
    const {getByText} = render(<EventCard event={free} />);
    expect(getByText('Free')).toBeTruthy();
  });

  it('marks private events', () => {
    const {getByText} = render(<EventCard event={paid} />);
    expect(getByText(/^Private ·/)).toBeTruthy();
  });

  it('passes the event id to onPress', () => {
    const onPress = jest.fn();
    const {getByText} = render(<EventCard event={free} onPress={onPress} />);
    fireEvent.press(getByText(free.name));
    expect(onPress).toHaveBeenCalledWith(free.id);
  });
});
