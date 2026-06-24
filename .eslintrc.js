module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    // Custom tabBar/header render props (props => <Custom {...props}/>) are the
    // idiomatic react-navigation pattern; the component reads hooks so it can't be
    // passed by reference. Allow it; still flag genuinely-unstable inline components.
    'react/no-unstable-nested-components': ['warn', {allowAsProps: true}],
  },
  overrides: [
    {
      // jest setup/config run in node + use jest globals
      files: ['jest.setup.js', 'jest.config.js', '**/__tests__/**', '**/*.test.*'],
      env: {jest: true, node: true},
    },
  ],
};
