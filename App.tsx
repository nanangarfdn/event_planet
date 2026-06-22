/**
 * Event Planet
 * @format
 */
import React from 'react';
import {StatusBar} from 'react-native';
import {Root} from './src/navigation/Root';
import {colors} from './src/theme';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor={colors.bg} />
      <Root />
    </>
  );
}
