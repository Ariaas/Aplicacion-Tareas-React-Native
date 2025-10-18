import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Button, Chip, Portal, Dialog } from 'react-native-paper';
import { usarTareas } from '../contexto/ContextoTareas';
import CampoTexto from '../componentes/CampoTexto';

/**
 * ========================================
 * PANTALLA: PantallaDetalleTarea
 * ========================================
 * 
 * Muestra los detalles completos de una tarea.
 * Permite editar, completar o eliminar la tarea.
 * 
 * CONCEPTOS IMPORTANTES:
 * 
 * 1. ROUTE PARAMS
 *    - route.params contiene los datos pasados desde otra pantalla
 *    - navigation.navigate('Pantalla', { dato: valor })
 *    - const { dato } = route.params
 * 
 * 2. FIND
 *    - Busca un elemento en un array que cumpla una condición
 *    - Retorna el primer elemento encontrado o undefined
 * 
 * 3. PORTAL (React Native Paper)
 *    - Renderiza componentes fuera de la jerarquía normal
 *    - Útil para modales y diálogos
 * 
 * 4. DIALOG
 *    - Ventana modal para confirmar acciones
 *    - Buena práctica para ediciones y eliminaciones
 */
const PantallaDetalleTarea = ({ route, navigation }) => {
  // OBTENER ID DE LA TAREA DESDE LOS PARÁMETROS
  const { idTarea } = route.params;
  
  // OBTENER DATOS Y FUNCIONES DEL CONTEXTO
  const { tareas, cambiarEstadoTarea, eliminarTarea, editarTarea } = usarTareas();
  
  // BUSCAR LA TAREA ESPECÍFICA
  const tarea = tareas.find((t) => t.id === idTarea);

  // ESTADO LOCAL PARA EL DIÁLOGO DE EDICIÓN
  const [dialogoVisible, establecerDialogoVisible] = useState(false);
  const [tituloEditar, establecerTituloEditar] = useState('');
  const [descripcionEditar, establecerDescripcionEditar] = useState('');

  // SI LA TAREA NO EXISTE, MOSTRAR MENSAJE
  if (!tarea) {
    return (
      <View style={estilos.contenedor}>
        <Text variant="headlineSmall">Tarea no encontrada</Text>
      </View>
    );
  }

  /**
   * FUNCIÓN: manejarEditar
   * 
   * Abre el diálogo y pre-llena los campos con los datos actuales
   */
  const manejarEditar = () => {
    establecerTituloEditar(tarea.titulo);
    establecerDescripcionEditar(tarea.descripcion);
    establecerDialogoVisible(true);
  };

  /**
   * FUNCIÓN: manejarGuardarEdicion
   * 
   * Valida y guarda los cambios
   */
  const manejarGuardarEdicion = () => {
    if (tituloEditar.trim() !== '') {
      editarTarea(tarea.id, tituloEditar.trim(), descripcionEditar.trim());
      establecerDialogoVisible(false);
    }
  };

  /**
   * FUNCIÓN: manejarEliminar
   * 
   * Elimina la tarea y vuelve a la pantalla anterior
   */
  const manejarEliminar = () => {
    eliminarTarea(tarea.id);
    navigation.goBack();
  };

  /**
   * FUNCIÓN: formatearFecha
   * 
   * Convierte la fecha ISO a formato legible en español
   */
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
          {/* ESTADO DE LA TAREA */}
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

          {/* TÍTULO */}
          <Text variant="headlineMedium" style={estilos.titulo}>
            {tarea.titulo}
          </Text>

          {/* DESCRIPCIÓN */}
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

          {/* FECHA DE CREACIÓN */}
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

      {/* BOTONES DE ACCIÓN */}
      <View style={estilos.contenedorAcciones}>
        <Button
          mode="contained"
          icon={tarea.completada ? 'close-circle' : 'check-circle'}
          onPress={() => cambiarEstadoTarea(tarea.id)}
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
          buttonColor="#f44336"
        >
          Eliminar Tarea
        </Button>
      </View>

      {/* DIÁLOGO PARA EDITAR */}
      <Portal>
        <Dialog 
          visible={dialogoVisible} 
          onDismiss={() => establecerDialogoVisible(false)}
        >
          <Dialog.Title>Editar Tarea</Dialog.Title>
          <Dialog.Content>
            <CampoTexto
              etiqueta="Título"
              valor={tituloEditar}
              alCambiar={establecerTituloEditar}
            />
            <CampoTexto
              etiqueta="Descripción"
              valor={descripcionEditar}
              alCambiar={establecerDescripcionEditar}
              multilinea={true}
              numeroLineas={3}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => establecerDialogoVisible(false)}>
              Cancelar
            </Button>
            <Button onPress={manejarGuardarEdicion}>
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
    backgroundColor: '#f5f5f5',
  },
  tarjeta: {
    margin: 16,
    elevation: 4,
  },
  contenedorEstado: {
    marginBottom: 16,
  },
  chipEstado: {
    alignSelf: 'flex-start',
  },
  chipCompletada: {
    backgroundColor: '#c8e6c9',
  },
  chipPendiente: {
    backgroundColor: '#fff9c4',
  },
  titulo: {
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  seccion: {
    marginTop: 16,
  },
  tituloSeccion: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#666',
  },
  descripcion: {
    color: '#333',
    lineHeight: 24,
  },
  sinDescripcion: {
    color: '#999',
    fontStyle: 'italic',
  },
  fecha: {
    color: '#666',
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
