import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Button, Chip, Portal, Dialog, HelperText } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { cambiarEstadoTarea, eliminarTarea, editarTarea, selectTareas } from '../store/tareasSlice';
import CampoTexto from '../componentes/CampoTexto';

const PantallaDetalleTarea = ({ route, navigation }) => {
  const { idTarea } = route.params;
  const dispatch = useDispatch();
  const tareas = useSelector(selectTareas);
  const tarea = tareas.find((t) => t.id === idTarea);

  const [dialogoVisible, establecerDialogoVisible] = useState(false);
  
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      titulo: '',
      descripcion: '',
    },
  });

  if (!tarea) {
    return (
      <View style={estilos.contenedor}>
        <Text variant="headlineSmall">Tarea no encontrada</Text>
      </View>
    );
  }

  const manejarEditar = () => {
    reset({
      titulo: tarea.titulo,
      descripcion: tarea.descripcion,
    });
    establecerDialogoVisible(true);
  };

  const onSubmitEdicion = (data) => {
    dispatch(editarTarea({
      id: tarea.id,
      titulo: data.titulo.trim(),
      descripcion: data.descripcion.trim(),
    }));
    establecerDialogoVisible(false);
  };

  const manejarEliminar = () => {
    dispatch(eliminarTarea(tarea.id));
    navigation.goBack();
  };

  const formatearFecha = (fechaString) => {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ScrollView style={estilos.contenedor}>
      <Card style={estilos.tarjeta}>
        <Card.Content>
          <View style={estilos.contenedorEstado}>
            <Chip
              icon={tarea.completada ? 'check-circle' : 'clock-outline'}
              style={[
                estilos.chipEstado,
                tarea.completada ? estilos.chipCompletada : estilos.chipPendiente,
              ]}
            >
              {tarea.completada ? 'Completada' : 'Pendiente'}
            </Chip>
          </View>

          <Text variant="headlineMedium" style={estilos.titulo}>
            {tarea.titulo}
          </Text>

          {tarea.descripcion ? (
            <View style={estilos.seccion}>
              <Text variant="titleMedium" style={estilos.tituloSeccion}>
                Descripción
              </Text>
              <Text variant="bodyLarge" style={estilos.descripcion}>
                {tarea.descripcion}
              </Text>
            </View>
          ) : (
            <Text variant="bodyMedium" style={estilos.sinDescripcion}>
              Sin descripción
            </Text>
          )}

          <View style={estilos.seccion}>
            <Text variant="titleMedium" style={estilos.tituloSeccion}>
              Fecha de creación
            </Text>
            <Text variant="bodyMedium" style={estilos.fecha}>
              {formatearFecha(tarea.creadaEn)}
            </Text>
          </View>
        </Card.Content>
      </Card>

      <View style={estilos.contenedorAcciones}>
        <Button
          mode="contained"
          icon={tarea.completada ? 'close-circle' : 'check-circle'}
          onPress={() => dispatch(cambiarEstadoTarea(tarea.id))}
          style={estilos.botonAccion}
        >
          {tarea.completada ? 'Marcar como Pendiente' : 'Marcar como Completada'}
        </Button>

        <Button
          mode="outlined"
          icon="pencil"
          onPress={manejarEditar}
          style={estilos.botonAccion}
        >
          Editar Tarea
        </Button>

        <Button
          mode="contained"
          icon="delete"
          onPress={manejarEliminar}
          style={[estilos.botonAccion, estilos.botonEliminar]}
          buttonColor="#FF5757"
        >
          Eliminar Tarea
        </Button>
      </View>

      <Portal>
        <Dialog 
          visible={dialogoVisible} 
          onDismiss={() => establecerDialogoVisible(false)}
        >
          <Dialog.Title>Editar Tarea</Dialog.Title>
          <Dialog.Content>
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
                    etiqueta="Título"
                    valor={value}
                    alCambiar={onChange}
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
                    etiqueta="Descripción"
                    valor={value}
                    alCambiar={onChange}
                    multilinea={true}
                    numeroLineas={3}
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
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => establecerDialogoVisible(false)}>
              Cancelar
            </Button>
            <Button onPress={handleSubmit(onSubmitEdicion)}>
              Guardar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#FFF5F7',
  },
  tarjeta: {
    margin: 16,
    elevation: 8,
    borderRadius: 20,
    shadowColor: '#FF6B9D',
    shadowOpacity: 0.15,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 6 },
  },
  contenedorEstado: {
    marginBottom: 16,
  },
  chipEstado: {
    alignSelf: 'flex-start',
  },
  chipCompletada: {
    backgroundColor: '#C7F9F5',
  },
  chipPendiente: {
    backgroundColor: '#FFE5EF',
  },
  titulo: {
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1F2937',
  },
  seccion: {
    marginTop: 16,
  },
  tituloSeccion: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#6B7280',
  },
  descripcion: {
    color: '#374151',
    lineHeight: 24,
  },
  sinDescripcion: {
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  fecha: {
    color: '#6B7280',
  },
  contenedorAcciones: {
    padding: 16,
  },
  botonAccion: {
    marginVertical: 8,
  },
  botonEliminar: {
    marginTop: 16,
  },
});

export default PantallaDetalleTarea;
