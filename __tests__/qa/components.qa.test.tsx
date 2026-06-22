import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {Avatar, Button, Chip, EventCard, Input} from '../../src/components';
import {mockEvents} from '../../src/data/mockEvents';

describe('QA · component edge cases', () => {
  it('Button without onPress does not crash when pressed', () => {
    const {getByText} = render(<Button label="No handler" />);
    expect(() => fireEvent.press(getByText('No handler'))).not.toThrow();
  });

  it('EventCard without onPress is not pressable and does not crash', () => {
    const {getByText} = render(<EventCard event={mockEvents[0]} />);
    expect(() => fireEvent.press(getByText(mockEvents[0].name))).not.toThrow();
  });

  it('Input shows the error and hides the helper when both are given', () => {
    const {getByText, queryByText} = render(
      <Input label="Email" error="Required" helper="We never share it" />,
    );
    expect(getByText('Required')).toBeTruthy();
    expect(queryByText('We never share it')).toBeNull();
  });

  it('Avatar renders even with an empty name', () => {
    const {toJSON} = render(<Avatar name="" />);
    expect(toJSON()).toBeTruthy();
  });

  it('Chip exposes its selected state for accessibility', () => {
    const {getByRole} = render(<Chip label="Free" selected />);
    expect(getByRole('button', {name: 'Free', selected: true})).toBeTruthy();
  });
});
