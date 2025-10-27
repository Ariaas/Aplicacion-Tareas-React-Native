import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import { Provider } from 'react-redux';
import { store } from './src/store';
import NavegadorApp from './src/navegacion/NavegadorApp';

const temaPersonalizado = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#6200ee',
    onSurface: '#000000',
    onSurfaceVariant: '#333333',
    placeholder: '#666666',
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={temaPersonalizado}>
        <NavegadorApp />
        <StatusBar style="light" />
      </PaperProvider>
    </Provider>
  );
}
