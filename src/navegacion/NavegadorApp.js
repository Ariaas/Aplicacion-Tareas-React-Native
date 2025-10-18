import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// IMPORTAR PANTALLAS
import PantallaInicio from '../pantallas/PantallaInicio';
import PantallaAgregarTarea from '../pantallas/PantallaAgregarTarea';
import PantallaDetalleTarea from '../pantallas/PantallaDetalleTarea';

/**
 * ========================================
 * REACT NAVIGATION - STACK NAVIGATOR
 * ========================================
 * 
 * ¿Qué es React Navigation?
 * - Librería para manejar la navegación entre pantallas
 * - Similar a un router en aplicaciones web
 * 
 * ¿Qué es Stack Navigator?
 * - Tipo de navegación donde las pantallas se "apilan"
 * - Como una pila de cartas: la última en entrar es la primera en salir
 * - Incluye animaciones de transición automáticas
 * - Tiene un header (barra superior) con botón de regreso
 * 
 * CONCEPTOS:
 * 
 * 1. NavigationContainer
 *    - Envuelve toda la navegación
 *    - Debe estar en la raíz de la app
 * 
 * 2. Stack.Navigator
 *    - Define el tipo de navegación (stack)
 *    - Contiene las pantallas (Stack.Screen)
 * 
 * 3. Stack.Screen
 *    - Cada pantalla de la app
 *    - name: identificador único para navegar
 *    - component: el componente que se renderiza
 *    - options: configuración (título, estilos, etc.)
 * 
 * 4. initialRouteName
 *    - La primera pantalla que se muestra al abrir la app
 * 
 * 5. screenOptions
 *    - Opciones que aplican a TODAS las pantallas
 *    - Útil para mantener consistencia visual
 */

const Stack = createStackNavigator();

const NavegadorApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          // Estilos del header (barra superior)
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {/* PANTALLA PRINCIPAL */}
        <Stack.Screen
          name="Inicio"
          component={PantallaInicio}
          options={{ title: 'Mis Tareas' }}
        />

        {/* PANTALLA PARA AGREGAR TAREA */}
        <Stack.Screen
          name="AgregarTarea"
          component={PantallaAgregarTarea}
          options={{ title: 'Nueva Tarea' }}
        />

        {/* PANTALLA DE DETALLE */}
        <Stack.Screen
          name="DetalleTarea"
          component={PantallaDetalleTarea}
          options={{ title: 'Detalle de Tarea' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavegadorApp;
