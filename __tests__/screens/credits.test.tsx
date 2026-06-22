import {fireEvent} from '@testing-library/react-native';
import {renderSignedIn} from '../../src/test/renderWithProviders';

describe('credits screen', () => {
  it('shows the balance and per-event cost', async () => {
    const {getByText, findByText} = renderSignedIn();
    fireEvent.press(getByText('Credits'));
    expect(await findByText('1,000 credits')).toBeTruthy();
    expect(await findByText('Each event costs 10 credits')).toBeTruthy();
  });
});
