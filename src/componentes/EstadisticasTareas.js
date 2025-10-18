import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';

/**
 * COMPONENTE: EstadisticasTareas
 * 
 * Este componente muestra las estadísticas de las tareas
 * en forma de chips (etiquetas) con iconos.
 * 
 * ¿Por qué crear este componente?
 * - Separa la lógica de visualización de estadísticas
 * - Puede reutilizarse en otras pantallas si es necesario
 * - Hace que HomeScreen sea más limpio y fácil de leer
 * 
 * Props:
 * @param {Object} estadisticas - Objeto con total, pendientes y completadas
 */
const EstadisticasTareas = ({ estadisticas }) => {
  return (
    <View style={estilos.contenedor}>
      {/* Chip de total de tareas */}
      <Chip icon="format-list-checks" style={estilos.chip}>
        Total: {estadisticas.total}
      </Chip>

      {/* Chip de tareas pendientes */}
      <Chip icon="clock-outline" style={estilos.chip}>
        Pendientes: {estadisticas.pendientes}
      </Chip>

      {/* Chip de tareas completadas */}
      <Chip icon="check-circle" style={estilos.chip}>
        Completadas: {estadisticas.completadas}
      </Chip>
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 2,
  },
  chip: {
    backgroundColor: '#e3f2fd',
  },
});

export default EstadisticasTareas;
