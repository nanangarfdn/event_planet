import {fireEvent} from '@testing-library/react-native';
import {renderApp} from '../../src/test/renderWithProviders';

describe('QA · login validation', () => {
  it('negative: Sign in is blocked with empty fields', () => {
    const {getByText, queryByText} = renderApp();
    fireEvent.press(getByText('Sign in'));
    expect(queryByText(/Hi, Aisha/)).toBeNull();
  });

  it('negative: Sign in is blocked with only an email', () => {
    const {getByText, getByLabelText, queryByText} = renderApp();
    fireEvent.changeText(getByLabelText('Email'), 'a@b.com');
    fireEvent.press(getByText('Sign in'));
    expect(queryByText(/Hi, Aisha/)).toBeNull();
  });

  it('negative: whitespace-only email does not count as filled', () => {
    const {getByText, getByLabelText, queryByText} = renderApp();
    fireEvent.changeText(getByLabelText('Email'), '   ');
    fireEvent.changeText(getByLabelText('Password'), 'pw');
    fireEvent.press(getByText('Sign in'));
    expect(queryByText(/Hi, Aisha/)).toBeNull();
  });

  it('positive: Sign in works once both fields are filled', async () => {
    const {getByText, getByLabelText, findByText} = renderApp();
    fireEvent.changeText(getByLabelText('Email'), 'a@b.com');
    fireEvent.changeText(getByLabelText('Password'), 'pw');
    fireEvent.press(getByText('Sign in'));
    expect(await findByText(/Hi, Aisha/)).toBeTruthy();
  });
});

describe('QA · register validation', () => {
  it('negative then positive: Sign up gated on name + email', async () => {
    const {getByText, getAllByLabelText, getByLabelText, findByText, queryByText} =
      renderApp();
    fireEvent.press(getByText('Create account'));
    await findByText('Create your account');

    // negative: nothing filled
    fireEvent.press(getByText('Sign up'));
    expect(queryByText(/Hi, Aisha/)).toBeNull();

    // positive: fill name + the register-screen email (last Email field on top)
    fireEvent.changeText(getByLabelText('Full name'), 'Zed Khan');
    const emails = getAllByLabelText('Email');
    fireEvent.changeText(emails[emails.length - 1], 'zed@b.com');
    fireEvent.press(getByText('Sign up'));
    expect(await findByText(/Hi, Aisha/)).toBeTruthy();
  });
});
