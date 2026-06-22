import {fireEvent} from '@testing-library/react-native';
import {renderSignedIn} from '../../src/test/renderWithProviders';

describe('QA · newly-wired actions', () => {
  it('Credits "Buy 500" tops up the balance', async () => {
    const u = renderSignedIn();
    fireEvent.press(u.getByText('Credits'));
    await u.findByText('1,000 credits');
    fireEvent.press(u.getByText('Buy 500 credits · RM 5'));
    expect(await u.findByText('1,500 credits')).toBeTruthy();
  });

  it('a free event Join shows a "going" confirmation', async () => {
    const u = renderSignedIn();
    fireEvent.press(u.getByText('Sunset Rooftop Run'));
    fireEvent.press(await u.findByText('Join event'));
    expect(await u.findByText("You're going 🎉")).toBeTruthy();
  });

  it('VenueDetail "Use this venue" opens the create wizard', async () => {
    const u = renderSignedIn();
    fireEvent.press(u.getByText('Venues & deals'));
    fireEvent.press(await u.findByText('Brew Lab Coffee'));
    fireEvent.press(await u.findByText('Use this venue'));
    expect(await u.findByText('Event details')).toBeTruthy();
  });

  it('a Home category pill navigates to Explore', async () => {
    const u = renderSignedIn();
    fireEvent.press(u.getByText('Music')); // category with no matching event -> unique
    expect(await u.findByText('Find your next event')).toBeTruthy();
  });

  it('a Home stat tile navigates (Balance -> Credits)', async () => {
    const u = renderSignedIn();
    fireEvent.press(u.getByText('Balance'));
    expect(await u.findByText('Your balance')).toBeTruthy();
  });
});
