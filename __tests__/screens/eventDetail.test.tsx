import {fireEvent} from '@testing-library/react-native';
import {renderSignedIn} from '../../src/test/renderWithProviders';

describe('event detail + enquiry flow', () => {
  it('opens an event from Home and shows its details', async () => {
    const {getByText, findByText} = renderSignedIn();
    fireEvent.press(getByText('Sunset Rooftop Run'));
    expect(
      await findByText(
        'A 5km social run ending with skyline views and live music.',
      ),
    ).toBeTruthy();
  });

  it('opens enquiry chat and masks foul words in sent messages', async () => {
    const {getByText, getByPlaceholderText, findByText} = renderSignedIn();
    fireEvent.press(getByText('Sunset Rooftop Run'));
    fireEvent.press(await findByText('Enquire organizer'));

    // seeded organizer message is visible
    expect(await findByText('Hi! How can I help with this event?')).toBeTruthy();

    fireEvent.changeText(getByPlaceholderText('Type a message'), 'this is a scam');
    fireEvent.press(getByText('Send'));
    expect(await findByText('this is a ****')).toBeTruthy();
  });
});
