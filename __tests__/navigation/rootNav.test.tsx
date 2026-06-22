import {fireEvent} from '@testing-library/react-native';
import {renderApp, renderSignedIn} from '../../src/test/renderWithProviders';

describe('auth gate navigation', () => {
  it('shows the Login screen when signed out', () => {
    const {getByText} = renderApp();
    expect(getByText('Event Planet')).toBeTruthy();
    expect(getByText('Sign in')).toBeTruthy();
  });

  it('navigates from Login to Register', async () => {
    const {getByText, findByText} = renderApp();
    fireEvent.press(getByText('Create account'));
    expect(await findByText('Create your account')).toBeTruthy();
  });

  it('lands on the Home tab after signing in', async () => {
    const {findByText} = renderSignedIn();
    expect(await findByText(/Hi, Aisha/)).toBeTruthy();
  });
});
