module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  // ponytail: async UI tests (findBy*) flake at the 5s default under CPU load. 15s, raise if a real hang appears.
  testTimeout: 15000,
  // Transform the RN + navigation ESM packages (preset ignores all of node_modules by default).
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation|react-native-screens|react-native-safe-area-context)/)',
  ],
};
