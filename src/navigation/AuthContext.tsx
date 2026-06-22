import React, {createContext, useContext, useMemo, useState} from 'react';
import {mockUser} from '../data/mockUser';
import {findAccount} from '../data/demoAccounts';
import type {User} from '../domain/types';

interface AuthState {
  isAuthed: boolean;
  user: User;
  /** Resolves a hardcoded demo account by email; falls back to a Normal user. */
  signIn: (email?: string) => void;
  signOut: () => void;
  /** Pay-to-verify: flips the badge and lifts the pax cap. */
  verify: () => void;
  spendCredits: (amount: number) => void;
  topUp: (amount: number) => void;
}

const AuthCtx = createContext<AuthState | undefined>(undefined);

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [isAuthed, setAuthed] = useState(false);
  const [user, setUser] = useState<User>(mockUser);

  const value = useMemo<AuthState>(
    () => ({
      isAuthed,
      user,
      signIn: email => {
        setUser(email ? findAccount(email)?.user ?? mockUser : mockUser);
        setAuthed(true);
      },
      signOut: () => setAuthed(false),
      verify: () =>
        setUser(u => ({...u, verified: true, role: 'verified'})),
      spendCredits: amount =>
        setUser(u => ({...u, credits: Math.max(0, u.credits - amount)})),
      topUp: amount => setUser(u => ({...u, credits: u.credits + amount})),
    }),
    [isAuthed, user],
  );

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthCtx);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
