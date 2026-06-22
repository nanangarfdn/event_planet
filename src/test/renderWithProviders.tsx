import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import {Root} from '../navigation/Root';

// ponytail: tests drive the real app tree (Root) — same providers as production,
// no parallel test-only navigator to drift out of sync.
export function renderApp() {
  return render(<Root />);
}

/** Render the app and complete the login screen, landing on the Home tab. */
export function renderSignedIn() {
  const utils = renderApp();
  fireEvent.changeText(utils.getByLabelText('Email'), 'aisha@example.com');
  fireEvent.changeText(utils.getByLabelText('Password'), 'secret123');
  fireEvent.press(utils.getByText('Sign in'));
  return utils;
}
