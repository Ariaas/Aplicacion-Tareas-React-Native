/**
 * Punto de entrada para web
 * Este archivo es necesario para que la app funcione en navegadores web
 */
import { registerRootComponent } from 'expo';
import App from './App';

// registerRootComponent llama a AppRegistry.registerComponent('main', () => App);
// También se asegura de que la app funcione correctamente en web
registerRootComponent(App);
