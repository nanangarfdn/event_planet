import {fireEvent} from '@testing-library/react-native';
import {renderSignedIn} from '../../src/test/renderWithProviders';

type Utils = ReturnType<typeof renderSignedIn>;

async function openWizard(u: Utils) {
  fireEvent.press(u.getByText('Create'));
  await u.findByText('Event details');
}

async function toPaxStep(u: Utils) {
  fireEvent.changeText(u.getByLabelText('Event name'), 'Launch Party');
  fireEvent.changeText(u.getByLabelText('Location'), 'KL Eco City');
  fireEvent.press(u.getByText('Next'));
  await u.findByText('Who can join?');
  fireEvent.press(u.getByText('Next'));
  await u.findByText('How many slots?');
}

describe('QA · create wizard gating (negative)', () => {
  it('blocks Next on the details step until name + location are filled', async () => {
    const u = renderSignedIn();
    await openWizard(u);
    fireEvent.press(u.getByText('Next')); // both empty -> blocked
    expect(u.getByText('Event details')).toBeTruthy();

    fireEvent.changeText(u.getByLabelText('Event name'), 'Launch Party');
    fireEvent.press(u.getByText('Next')); // location still empty -> blocked
    expect(u.getByText('Event details')).toBeTruthy();
  });

  it('blocks Next on the pax step when slots is empty or zero', async () => {
    const u = renderSignedIn();
    await openWizard(u);
    await toPaxStep(u);
    fireEvent.press(u.getByText('Next')); // pax empty (0) -> blocked
    expect(u.getByText('How many slots?')).toBeTruthy();
    expect(u.queryByText('Pricing')).toBeNull();
  });

  it('blocks Next on a paid event until a price is entered', async () => {
    const u = renderSignedIn();
    await openWizard(u);
    await toPaxStep(u);
    fireEvent.changeText(u.getByLabelText('Number of slots'), '30');
    fireEvent.press(u.getByText('Next'));
    await u.findByText('Pricing');

    fireEvent.press(u.getByText('Paid'));
    fireEvent.press(u.getByText('Next')); // price empty -> blocked
    expect(u.getByText('Pricing')).toBeTruthy();
    expect(u.queryByText('Connect Fiuu gateway')).toBeNull();
  });
});
