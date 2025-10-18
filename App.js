import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import { ProveedorTareas } from './src/contexto/ContextoTareas';
import NavegadorApp from './src/navegacion/NavegadorApp';

/**
 * TEMA PERSONALIZADO
 * 
 * React Native Paper usa un sistema de temas para los colores.
 * Aquí personalizamos los colores para que los textos sean más visibles.
 */
const temaPersonalizado = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    // Color principal de la app
    primary: '#6200ee',
    // Color de los textos en inputs
    onSurface: '#000000',
    // Color de los textos secundarios
    onSurfaceVariant: '#333333',
    // Color del placeholder
    placeholder: '#666666',
  },
};

/**
 * ========================================
 * COMPONENTE PRINCIPAL: App
 * ========================================
 * 
 * Este es el punto de entrada de la aplicación.
 * Aquí envolvemos toda la app con los Providers necesarios.
 * 
 * ESTRUCTURA DE PROVIDERS:
 * 
 * 1. PaperProvider (React Native Paper)
 *    - Proporciona el tema y componentes de Material Design
 *    - Debe envolver toda la app para usar componentes de Paper
 * 
 * 2. ProveedorTareas (Context API)
 *    - Proporciona el estado global de tareas
 *    - Permite que cualquier componente acceda a las tareas
 * 
 * 3. NavegadorApp (React Navigation)
 *    - Maneja la navegación entre pantallas
 *    - Ya incluye NavigationContainer internamente
 * 
 * ORDEN IMPORTANTE:
 * - Los providers deben estar en el orden correcto
 * - El más externo es PaperProvider
 * - Luego ProveedorTareas (nuestro contexto)
 * - Finalmente NavegadorApp (las pantallas)
 */
export default function App() {
  return (
    <PaperProvider theme={temaPersonalizado}>
      <ProveedorTareas>
        <NavegadorApp />
        <StatusBar style="light" />
      </ProveedorTareas>
    </PaperProvider>
  );
}
