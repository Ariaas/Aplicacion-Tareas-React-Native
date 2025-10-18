import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, Text, Snackbar } from 'react-native-paper';
import { usarTareas } from '../contexto/ContextoTareas';

// IMPORTAR COMPONENTE REUTILIZABLE
import CampoTexto from '../componentes/CampoTexto';

/**
 * ========================================
 * PANTALLA: PantallaAgregarTarea
 * ========================================
 * 
 * Permite crear una nueva tarea.
 * 
 * CONCEPTOS IMPORTANTES:
 * 
 * 1. useState
 *    - Hook para manejar estado local del componente
 *    - const [valor, setValor] = useState(valorInicial)
 *    - Cada vez que cambia, el componente se re-renderiza
 * 
 * 2. VALIDACIÓN
 *    - Verificar que los datos sean correctos antes de guardar
 *    - Mostrar mensajes de error al usuario
 * 
 * 3. KeyboardAvoidingView
 *    - Evita que el teclado tape los inputs
 *    - Importante para buena UX en móviles
 * 
 * 4. Snackbar
 *    - Mensaje temporal que aparece en la parte inferior
 *    - Útil para feedback al usuario
 */
const PantallaAgregarTarea = ({ navigation }) => {
  // ESTADO LOCAL
  const [titulo, establecerTitulo] = useState('');
  const [descripcion, establecerDescripcion] = useState('');
  const [snackbarVisible, establecerSnackbarVisible] = useState(false);

  // OBTENER FUNCIÓN DEL CONTEXTO
  const { agregarTarea } = usarTareas();

  /**
   * FUNCIÓN: manejarAgregarTarea
   * 
   * 1. Valida que el título no esté vacío
   * 2. Si es válido, agrega la tarea
   * 3. Limpia el formulario
   * 4. Vuelve a la pantalla anterior
   */
  const manejarAgregarTarea = () => {
    // VALIDACIÓN: trim() elimina espacios al inicio y final
    if (titulo.trim() === '') {
      establecerSnackbarVisible(true);
      return; // Detener la ejecución si no es válido
    }

    // Agregar tarea usando la función del contexto
    agregarTarea(titulo.trim(), descripcion.trim());

    // Limpiar formulario
    establecerTitulo('');
    establecerDescripcion('');

    // Navegar de regreso (goBack va a la pantalla anterior)
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

          {/* COMPONENTE REUTILIZABLE: CampoTexto */}
          <CampoTexto
            etiqueta="Título *"
            valor={titulo}
            alCambiar={establecerTitulo}
            placeholder="Ej: Comprar leche"
            longitudMaxima={50}
          />

          <CampoTexto
            etiqueta="Descripción (opcional)"
            valor={descripcion}
            alCambiar={establecerDescripcion}
            multilinea={true}
            numeroLineas={4}
            placeholder="Agrega detalles sobre la tarea..."
            longitudMaxima={200}
          />

          {/* BOTONES */}
          <View style={estilos.contenedorBotones}>
            <Button
              mode="contained"
              onPress={manejarAgregarTarea}
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

      {/* SNACKBAR: Mensaje de error */}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => establecerSnackbarVisible(false)}
        duration={3000}
        action={{
          label: 'OK',
          onPress: () => establecerSnackbarVisible(false),
        }}
      >
        El título es obligatorio
      </Snackbar>
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
