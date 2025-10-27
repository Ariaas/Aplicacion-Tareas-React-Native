import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const EstadoVacio = ({ 
  titulo = 'No hay tareas', 
  subtitulo = 'Presiona el botón + para agregar una nueva tarea',
  icono 
}) => {
  return (
    <View style={estilos.contenedor}>
      <Text variant="headlineSmall" style={estilos.titulo}>
        {titulo}
      </Text>
      <Text variant="bodyMedium" style={estilos.subtitulo}>
        {subtitulo}
      </Text>
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  titulo: {
    color: '#2D3436',
    marginBottom: 12,
    fontWeight: 'bold',
  },
  subtitulo: {
    color: '#636E72',
    textAlign: 'center',
    fontSize: 15,
  },
});

export default EstadoVacio;
