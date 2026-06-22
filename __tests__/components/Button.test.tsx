import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {Button} from '../../src/components';

describe('Button', () => {
  it('renders its label', () => {
    const {getByText} = render(<Button label="Join event" />);
    expect(getByText('Join event')).toBeTruthy();
  });

  it('fires onPress when tapped', () => {
    const onPress = jest.fn();
    const {getByText} = render(<Button label="Join" onPress={onPress} />);
    fireEvent.press(getByText('Join'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not fire onPress when disabled', () => {
    const onPress = jest.fn();
    const {getByText} = render(
      <Button label="Join" onPress={onPress} disabled />,
    );
    fireEvent.press(getByText('Join'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('shows a spinner instead of the label while loading', () => {
    const {queryByText} = render(<Button label="Join" loading />);
    expect(queryByText('Join')).toBeNull();
  });
});
