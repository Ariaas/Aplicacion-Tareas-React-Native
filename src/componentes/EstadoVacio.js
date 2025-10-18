import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

/**
 * COMPONENTE: EstadoVacio
 * 
 * Este componente se muestra cuando no hay tareas en la lista.
 * Es un patrón común llamado "Empty State" (Estado Vacío).
 * 
 * ¿Por qué es útil?
 * - Mejora la experiencia del usuario
 * - Guía al usuario sobre qué hacer
 * - Hace la app más amigable
 * 
 * Props:
 * @param {string} titulo - Título principal del mensaje
 * @param {string} subtitulo - Texto explicativo secundario
 * @param {string} icono - Nombre del icono (opcional)
 */
const EstadoVacio = ({ 
  titulo = 'No hay tareas', 
  subtitulo = 'Presiona el botón + para agregar una nueva tarea',
  icono 
}) => {
  return (
    <View style={estilos.contenedor}>
      {/* Aquí podrías agregar un icono si quisieras */}
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
    color: '#333333',  // Gris oscuro para mejor lectura
    marginBottom: 8,
  },
  subtitulo: {
    color: '#666666',  // Gris medio para mejor lectura
    textAlign: 'center',
  },
});

export default EstadoVacio;
