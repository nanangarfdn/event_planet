import React from 'react';
import {render} from '@testing-library/react-native';
import {Avatar} from '../../src/components';

describe('Avatar', () => {
  it('falls back to initials when no image is given', () => {
    const {getByText} = render(<Avatar name="Aisha Rahman" />);
    expect(getByText('AR')).toBeTruthy();
  });

  it('uses a single initial for one-word names', () => {
    const {getByText} = render(<Avatar name="Zed" />);
    expect(getByText('Z')).toBeTruthy();
  });
});
