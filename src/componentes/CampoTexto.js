import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

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

const coloresInput = {
  text: '#000000',
  placeholder: '#666666',
  background: '#ffffff',
};

export default CampoTexto;
