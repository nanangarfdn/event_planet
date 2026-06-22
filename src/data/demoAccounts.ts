import type {User} from '../domain/types';

// Hardcoded demo accounts — one per role. Sign in with any email below + the
// shared demo password. Any other email signs in as a Normal user.
export const DEMO_PASSWORD = 'demo1234';

export interface DemoAccount {
  email: string;
  password: string;
  user: User;
}

export const demoAccounts: DemoAccount[] = [
  {
    email: 'normal@eventplanet.app',
    password: DEMO_PASSWORD,
    user: {
      id: 'u-normal',
      name: 'Nadia Normal',
      email: 'normal@eventplanet.app',
      role: 'normal',
      credits: 1000,
      verified: false,
    },
  },
  {
    email: 'verified@eventplanet.app',
    password: DEMO_PASSWORD,
    user: {
      id: 'u-verified',
      name: 'Vera Verified',
      email: 'verified@eventplanet.app',
      role: 'verified',
      credits: 1000,
      verified: true,
    },
  },
  {
    email: 'merchant@eventplanet.app',
    password: DEMO_PASSWORD,
    user: {
      id: 'u-merchant',
      name: 'Marco Merchant',
      email: 'merchant@eventplanet.app',
      role: 'merchant',
      credits: 1000,
      verified: true,
    },
  },
  {
    email: 'admin@eventplanet.app',
    password: DEMO_PASSWORD,
    user: {
      id: 'u-admin',
      name: 'Adam Admin',
      email: 'admin@eventplanet.app',
      role: 'admin',
      credits: 9999,
      verified: true,
    },
  },
];

export function findAccount(email: string): DemoAccount | undefined {
  const e = email.trim().toLowerCase();
  return demoAccounts.find(a => a.email.toLowerCase() === e);
}
