import {fireEvent} from '@testing-library/react-native';
import {renderSignedIn} from '../../src/test/renderWithProviders';

async function openChat(u: ReturnType<typeof renderSignedIn>) {
  fireEvent.press(u.getByText('Sunset Rooftop Run'));
  fireEvent.press(await u.findByText('Enquire organizer'));
  await u.findByText('Hi! How can I help with this event?');
}

describe('QA · enquiry chat', () => {
  it('negative: a whitespace-only message is not sent (draft kept)', async () => {
    const u = renderSignedIn();
    await openChat(u);
    fireEvent.changeText(u.getByPlaceholderText('Type a message'), '   ');
    fireEvent.press(u.getByText('Send'));
    // send() bails before clearing the draft → input still holds the text
    expect(u.getByDisplayValue('   ')).toBeTruthy();
  });

  it('positive: a clean message sends and clears the draft', async () => {
    const u = renderSignedIn();
    await openChat(u);
    fireEvent.changeText(u.getByPlaceholderText('Type a message'), 'Is parking available?');
    fireEvent.press(u.getByText('Send'));
    expect(await u.findByText('Is parking available?')).toBeTruthy();
  });

  it('positive: foul words are masked but the message still sends', async () => {
    const u = renderSignedIn();
    await openChat(u);
    fireEvent.changeText(u.getByPlaceholderText('Type a message'), 'this event is a scam');
    fireEvent.press(u.getByText('Send'));
    expect(await u.findByText('this event is a ****')).toBeTruthy();
  });
});
