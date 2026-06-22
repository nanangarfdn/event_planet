import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import {Input} from '../../src/components';

describe('Input', () => {
  it('renders label and forwards text changes', () => {
    const onChangeText = jest.fn();
    const {getByText, getByPlaceholderText} = render(
      <Input
        label="Event name"
        placeholder="e.g. Sunset Run"
        onChangeText={onChangeText}
      />,
    );
    expect(getByText('Event name')).toBeTruthy();
    fireEvent.changeText(getByPlaceholderText('e.g. Sunset Run'), 'Gala');
    expect(onChangeText).toHaveBeenCalledWith('Gala');
  });

  it('shows an error message when provided', () => {
    const {getByText} = render(<Input label="Email" error="Required" />);
    expect(getByText('Required')).toBeTruthy();
  });
});
