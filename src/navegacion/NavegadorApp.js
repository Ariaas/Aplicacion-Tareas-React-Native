import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import PantallaInicio from '../pantallas/PantallaInicio';
import PantallaAgregarTarea from '../pantallas/PantallaAgregarTarea';
import PantallaDetalleTarea from '../pantallas/PantallaDetalleTarea';

const Stack = createStackNavigator();

const NavegadorApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Inicio"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Inicio"
          component={PantallaInicio}
          options={{ title: 'Mis Tareas' }}
        />

        <Stack.Screen
          name="AgregarTarea"
          component={PantallaAgregarTarea}
          options={{ title: 'Nueva Tarea' }}
        />

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
