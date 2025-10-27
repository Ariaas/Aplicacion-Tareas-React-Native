import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';

const EstadisticasTareas = ({ estadisticas }) => {
  return (
    <View style={estilos.contenedor}>
      <Chip icon="format-list-checks" style={estilos.chipTotal} textStyle={estilos.chipTexto}>
        Total: {estadisticas.total}
      </Chip>

      <Chip icon="clock-outline" style={estilos.chipPendiente} textStyle={estilos.chipTexto}>
        Pendientes: {estadisticas.pendientes}
      </Chip>

      <Chip icon="check-circle" style={estilos.chipCompletada} textStyle={estilos.chipTexto}>
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
    backgroundColor: '#FFFFFF',
    elevation: 4,
    shadowColor: '#FF6B9D',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  chipTotal: {
    backgroundColor: '#FFE5EF',
    borderWidth: 2,
    borderColor: '#FF6B9D',
  },
  chipPendiente: {
    backgroundColor: '#FFF8DC',
    borderWidth: 2,
    borderColor: '#FFD93D',
  },
  chipCompletada: {
    backgroundColor: '#C7F9F5',
    borderWidth: 2,
    borderColor: '#4ECDC4',
  },
  chipTexto: {
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default EstadisticasTareas;
