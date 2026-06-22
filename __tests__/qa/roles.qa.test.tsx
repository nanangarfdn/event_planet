import {fireEvent} from '@testing-library/react-native';
import {renderApp} from '../../src/test/renderWithProviders';
import {demoAccounts, findAccount, DEMO_PASSWORD} from '../../src/data/demoAccounts';

describe('QA · demo accounts (one per role)', () => {
  it('has a distinct account for each of the four roles', () => {
    const roles = demoAccounts.map(a => a.user.role).sort();
    expect(roles).toEqual(['admin', 'merchant', 'normal', 'verified']);
    demoAccounts.forEach(a => expect(a.password).toBe(DEMO_PASSWORD));
  });

  it('resolves accounts case-insensitively and ignores unknown emails', () => {
    expect(findAccount('ADMIN@eventplanet.app')?.user.role).toBe('admin');
    expect(findAccount('stranger@example.com')).toBeUndefined();
  });

  describe.each(demoAccounts)('sign-in: $user.role', acc => {
    it(`logs in ${acc.user.name} and reflects verification`, async () => {
      const {getByText, getByLabelText, findByText} = renderApp();
      fireEvent.changeText(getByLabelText('Email'), acc.email);
      fireEvent.changeText(getByLabelText('Password'), acc.password);
      fireEvent.press(getByText('Sign in'));

      const first = acc.user.name.split(' ')[0];
      expect(await findByText(new RegExp(`Hi, ${first}`))).toBeTruthy();

      fireEvent.press(getByText('Profile'));
      if (acc.user.verified) {
        expect(await findByText('Verified ✓')).toBeTruthy();
      } else {
        expect(await findByText('Verify my account')).toBeTruthy();
      }
    });
  });
});
