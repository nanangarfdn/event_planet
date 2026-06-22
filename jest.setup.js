/* Jest setup — mock the two native-backed nav deps so screens render in Node. */

// Use the library's official jest mock — it keeps the real insets/frame contexts
// (which @react-navigation/elements reads) and only stubs the native bits.
jest.mock('react-native-safe-area-context', () =>
  require('react-native-safe-area-context/jest/mock').default,
);

// LinearGradient is a native view — render it as a plain host component in tests.
jest.mock('react-native-linear-gradient', () => 'LinearGradient');

// react-native-svg — render primitives as plain host components in tests.
jest.mock('react-native-svg', () => {
  const React = require('react');
  const mk = name => ({children, ...p}) => React.createElement(name, p, children);
  return {
    __esModule: true,
    default: mk('Svg'),
    Svg: mk('Svg'),
    Path: mk('Path'),
    Circle: mk('Circle'),
    Line: mk('Line'),
    G: mk('G'),
    Rect: mk('Rect'),
  };
});

// react-native-screens disables itself without the native module; silence its warning.
jest.mock('react-native-screens', () => {
  const actual = jest.requireActual('react-native-screens');
  return {...actual, enableScreens: jest.fn()};
});
