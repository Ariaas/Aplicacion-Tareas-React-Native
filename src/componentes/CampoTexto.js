import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

/**
 * COMPONENTE: CampoTexto
 * 
 * Componente reutilizable para campos de entrada de texto.
 * Envuelve el TextInput de React Native Paper con estilos consistentes.
 * 
 * ¿Ventajas de componentizar inputs?
 * - Estilos consistentes en toda la app
 * - Fácil agregar validaciones o funcionalidades comunes
 * - Un solo lugar para modificar el diseño de todos los inputs
 * 
 * Props:
 * @param {string} etiqueta - Texto que aparece como label
 * @param {string} valor - Valor actual del campo
 * @param {Function} alCambiar - Función que se ejecuta al cambiar el texto
 * @param {boolean} multilinea - Si permite múltiples líneas
 * @param {number} numeroLineas - Cantidad de líneas visibles (si es multilínea)
 * @param {string} placeholder - Texto de ejemplo
 * @param {number} longitudMaxima - Máximo de caracteres permitidos
 */
const CampoTexto = ({
  etiqueta,
  valor,
  alCambiar,
  multilinea = false,
  numeroLineas = 1,
  placeholder = '',
  longitudMaxima,
}) => {
  return (
    <TextInput
      label={etiqueta}
      value={valor}
      onChangeText={alCambiar}
      mode="outlined"
      multiline={multilinea}
      numberOfLines={numeroLineas}
      style={estilos.input}
      placeholder={placeholder}
      maxLength={longitudMaxima}
      textColor={coloresInput.text}
      placeholderTextColor={coloresInput.placeholder}
      outlineColor="#cccccc"
      activeOutlineColor="#6200ee"
    />
  );
};

const estilos = StyleSheet.create({
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
});

// Configuración de colores para el input
const coloresInput = {
  text: '#000000',           // Texto negro
  placeholder: '#666666',    // Placeholder gris oscuro
  background: '#ffffff',     // Fondo blanco
};

export default CampoTexto;
