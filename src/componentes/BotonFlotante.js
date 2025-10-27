import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

const BotonFlotante = ({ icono = 'plus', alPresionar, etiqueta }) => {
  return (
    <FAB
      icon={icono}
      label={etiqueta}
      style={estilos.fab}
      onPress={alPresionar}
    />
  );
};

const estilos = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#FF6B9D',
    elevation: 12,
    shadowColor: '#FF6B9D',
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
  },
});

export default BotonFlotante;
