import {fireEvent} from '@testing-library/react-native';
import {renderSignedIn} from '../../src/test/renderWithProviders';

async function openWizard(utils: ReturnType<typeof renderSignedIn>) {
  fireEvent.press(utils.getByText('Create'));
  await utils.findByText('Event details');
}

async function fillDetails(utils: ReturnType<typeof renderSignedIn>) {
  fireEvent.changeText(utils.getByLabelText('Event name'), 'Launch Party');
  fireEvent.changeText(utils.getByLabelText('Location'), 'KL Eco City');
  fireEvent.press(utils.getByText('Next')); // -> type
  await utils.findByText('Who can join?');
  fireEvent.press(utils.getByText('Next')); // -> pax
  await utils.findByText('How many slots?');
}

describe('create event wizard', () => {
  it('walks a free event through to publish', async () => {
    const utils = renderSignedIn();
    await openWizard(utils);
    await fillDetails(utils);

    fireEvent.changeText(utils.getByLabelText('Number of slots'), '30');
    fireEvent.press(utils.getByText('Next')); // -> payment (free, no docs)
    expect(await utils.findByText('Pricing')).toBeTruthy();

    fireEvent.press(utils.getByText('Next')); // free -> review (no Fiuu)
    expect(await utils.findByText('Review & publish')).toBeTruthy();

    fireEvent.press(utils.getByText('Publish · 10 credits'));
    expect(await utils.findByText('🎉 Event published!')).toBeTruthy();
  });

  it('blocks a normal user from creating an event over 49 pax', async () => {
    const utils = renderSignedIn();
    await openWizard(utils);
    await fillDetails(utils);

    fireEvent.changeText(utils.getByLabelText('Number of slots'), '60');
    expect(
      await utils.findByText('Verified account required for 50+ pax'),
    ).toBeTruthy();

    fireEvent.press(utils.getByText('Next')); // disabled -> stays
    expect(utils.queryByText('Pricing')).toBeNull();
    expect(utils.getByText('How many slots?')).toBeTruthy();
  });

  it('reveals the Fiuu payout step only for paid events', async () => {
    const utils = renderSignedIn();
    await openWizard(utils);
    await fillDetails(utils);

    fireEvent.changeText(utils.getByLabelText('Number of slots'), '30');
    fireEvent.press(utils.getByText('Next')); // -> payment
    await utils.findByText('Pricing');

    fireEvent.press(utils.getByText('Paid'));
    fireEvent.changeText(utils.getByLabelText('Ticket price (RM)'), '20');
    fireEvent.press(utils.getByText('Next')); // paid -> Fiuu
    expect(await utils.findByText('Connect Fiuu gateway')).toBeTruthy();
  });

  it('shows the document-upload step for verified users over 50 pax', async () => {
    const utils = renderSignedIn();
    // verify the account first (lifts the pax cap)
    fireEvent.press(utils.getByText('Profile'));
    fireEvent.press(await utils.findByText('Verify my account'));
    fireEvent.press(await utils.findByText('Pay & verify · RM 50'));
    fireEvent.press(await utils.findByText('Done'));

    await openWizard(utils);
    await fillDetails(utils);
    fireEvent.changeText(utils.getByLabelText('Number of slots'), '60');
    fireEvent.press(utils.getByText('Next')); // -> docs (pax > 50)
    expect(await utils.findByText('Upload documents')).toBeTruthy();
  });
});
