import React from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Text, HelperText } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { agregarTarea } from '../store/tareasSlice';

import CampoTexto from '../componentes/CampoTexto';

const PantallaAgregarTarea = ({ navigation }) => {
  const dispatch = useDispatch();
  
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      titulo: '',
      descripcion: '',
    },
  });

  const onSubmit = (data) => {
    dispatch(agregarTarea({
      titulo: data.titulo.trim(),
      descripcion: data.descripcion.trim(),
    }));
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={estilos.contenedor}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={estilos.contenidoScroll}>
        <View style={estilos.contenedorFormulario}>
          <Text variant="titleLarge" style={estilos.encabezado}>
            Crear Nueva Tarea
          </Text>

          <Controller
            control={control}
            name="titulo"
            rules={{
              required: 'El título es obligatorio',
              minLength: {
                value: 3,
                message: 'El título debe tener al menos 3 caracteres',
              },
              maxLength: {
                value: 50,
                message: 'El título no puede exceder 50 caracteres',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <>
                <CampoTexto
                  etiqueta="Título *"
                  valor={value}
                  alCambiar={onChange}
                  placeholder="Ej: Comprar leche"
                  longitudMaxima={50}
                />
                {errors.titulo && (
                  <HelperText type="error" visible={true}>
                    {errors.titulo.message}
                  </HelperText>
                )}
              </>
            )}
          />

          <Controller
            control={control}
            name="descripcion"
            rules={{
              maxLength: {
                value: 200,
                message: 'La descripción no puede exceder 200 caracteres',
              },
            }}
            render={({ field: { onChange, value } }) => (
              <>
                <CampoTexto
                  etiqueta="Descripción (opcional)"
                  valor={value}
                  alCambiar={onChange}
                  multilinea={true}
                  numeroLineas={4}
                  placeholder="Agrega detalles sobre la tarea..."
                  longitudMaxima={200}
                />
                {errors.descripcion && (
                  <HelperText type="error" visible={true}>
                    {errors.descripcion.message}
                  </HelperText>
                )}
              </>
            )}
          />

          <View style={estilos.contenedorBotones}>
            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              style={estilos.boton}
              icon="check"
            >
              Guardar Tarea
            </Button>

            <Button
              mode="outlined"
              onPress={() => navigation.goBack()}
              style={estilos.boton}
              icon="close"
            >
              Cancelar
            </Button>
          </View>
        </View>
      </ScrollView>

    </KeyboardAvoidingView>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contenidoScroll: {
    flexGrow: 1,
  },
  contenedorFormulario: {
    padding: 20,
  },
  encabezado: {
    marginBottom: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  contenedorBotones: {
    marginTop: 8,
  },
  boton: {
    marginVertical: 8,
  },
});

export default PantallaAgregarTarea;
