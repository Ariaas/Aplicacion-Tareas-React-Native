import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';

const EstadisticasTareas = ({ estadisticas }) => {
  return (
    <View style={estilos.contenedor}>
      <Chip icon="format-list-checks" style={estilos.chip}>
        Total: {estadisticas.total}
      </Chip>

      <Chip icon="clock-outline" style={estilos.chip}>
        Pendientes: {estadisticas.pendientes}
      </Chip>

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
