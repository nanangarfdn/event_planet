import React from 'react';
import {render} from '@testing-library/react-native';
import {Badge} from '../../src/components';

describe('Badge', () => {
  it('renders its label', () => {
    const {getByText} = render(<Badge label="Verified" tone="success" />);
    expect(getByText('Verified')).toBeTruthy();
  });
});
