import {fireEvent} from '@testing-library/react-native';
import {renderSignedIn} from '../../src/test/renderWithProviders';

describe('bottom tab navigation', () => {
  it('switches between the five tabs', async () => {
    const {getByText, findByText} = renderSignedIn();
    await findByText(/Hi, Aisha/); // Home

    fireEvent.press(getByText('Explore'));
    expect(await findByText('Find your next event')).toBeTruthy();

    fireEvent.press(getByText('Create'));
    expect(await findByText('Event details')).toBeTruthy();

    fireEvent.press(getByText('Credits'));
    expect(await findByText('1,000 credits')).toBeTruthy();

    fireEvent.press(getByText('Profile'));
    expect(await findByText('aisha@example.com')).toBeTruthy();

    fireEvent.press(getByText('Home'));
    expect(await findByText(/Hi, Aisha/)).toBeTruthy();
  });
});
