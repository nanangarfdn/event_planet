import {fireEvent} from '@testing-library/react-native';
import {renderSignedIn} from '../../src/test/renderWithProviders';

describe('venue browse flow', () => {
  it('lists venues and opens a venue detail', async () => {
    const {getByText, findByText} = renderSignedIn();
    fireEvent.press(getByText('Venues & deals'));
    expect(await findByText('Partner spots with offers')).toBeTruthy();

    fireEvent.press(getByText('Brew Lab Coffee'));
    expect(await findByText('Use this venue')).toBeTruthy();
  });
});
