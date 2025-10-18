import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';

/**
 * COMPONENTE: BotonFlotante
 * 
 * FAB = Floating Action Button (Botón de Acción Flotante)
 * Es un botón circular que flota sobre el contenido.
 * 
 * ¿Por qué componentizar esto?
 * - Puedes personalizar el estilo en un solo lugar
 * - Fácil de reutilizar con diferentes iconos y acciones
 * - Mantiene consistencia en toda la app
 * 
 * Props:
 * @param {string} icono - Nombre del icono de Material Design
 * @param {Function} alPresionar - Función que se ejecuta al presionar
 * @param {string} etiqueta - Texto opcional que aparece al lado del botón
 */
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
    backgroundColor: '#6200ee',
  },
});

export default BotonFlotante;
