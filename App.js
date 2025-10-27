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
    primary: '#FF6B9D',
    primaryContainer: '#FFE5EF',
    secondary: '#4ECDC4',
    secondaryContainer: '#C7F9F5',
    tertiary: '#FFD93D',
    tertiaryContainer: '#FFF8DC',
    surface: '#FFFFFF',
    surfaceVariant: '#F8F9FA',
    background: '#FFF5F7',
    error: '#FF5757',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onSurface: '#2D3436',
    onSurfaceVariant: '#636E72',
    outline: '#DFE6E9',
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
