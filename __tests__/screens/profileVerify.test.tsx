import {fireEvent} from '@testing-library/react-native';
import {renderSignedIn} from '../../src/test/renderWithProviders';

describe('profile + verification flow', () => {
  it('verifies the account and shows the badge', async () => {
    const {getByText, findByText} = renderSignedIn();
    fireEvent.press(getByText('Profile'));
    expect(await findByText('Aisha Rahman')).toBeTruthy();

    fireEvent.press(await findByText('Verify my account'));
    expect(await findByText('Verify your account')).toBeTruthy();

    fireEvent.press(getByText('Pay & verify · RM 50'));
    expect(await findByText("You're verified!")).toBeTruthy();

    fireEvent.press(getByText('Done'));
    expect(await findByText('Verified ✓')).toBeTruthy();
  });
});
