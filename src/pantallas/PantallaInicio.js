import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { usarTareas } from '../contexto/ContextoTareas';

// IMPORTAR COMPONENTES REUTILIZABLES
import TarjetaTarea from '../componentes/TarjetaTarea';
import EstadisticasTareas from '../componentes/EstadisticasTareas';
import EstadoVacio from '../componentes/EstadoVacio';
import BotonFlotante from '../componentes/BotonFlotante';

/**
 * ========================================
 * PANTALLA: PantallaInicio
 * ========================================
 * 
 * Esta es la pantalla principal de la app.
 * Muestra la lista de tareas y permite navegar a otras pantallas.
 * 
 * CONCEPTOS IMPORTANTES:
 * 
 * 1. PROPS DE NAVEGACIÓN
 *    - navigation: objeto que permite navegar entre pantallas
 *    - navigation.navigate('NombrePantalla'): ir a otra pantalla
 *    - navigation.navigate('Pantalla', { datos }): pasar datos
 * 
 * 2. CUSTOM HOOK (usarTareas)
 *    - Accede al contexto global de tareas
 *    - Proporciona funciones y datos
 * 
 * 3. FLATLIST
 *    - Componente optimizado para listas largas
 *    - Renderiza solo los elementos visibles
 *    - Mejor rendimiento que ScrollView con map()
 * 
 * 4. COMPONENTIZACIÓN
 *    - En lugar de tener todo el código aquí
 *    - Usamos componentes pequeños y reutilizables
 *    - Código más limpio y fácil de mantener
 */
const PantallaInicio = ({ navigation }) => {
  // OBTENER DATOS Y FUNCIONES DEL CONTEXTO
  const { tareas, cambiarEstadoTarea, eliminarTarea, obtenerEstadisticas } = usarTareas();
  const estadisticas = obtenerEstadisticas();

  /**
   * FUNCIÓN: renderizarTarea
   * 
   * FlatList necesita una función que renderice cada elemento
   * Recibe un objeto con la propiedad 'item' (la tarea actual)
   * 
   * Aquí usamos el componente TarjetaTarea en lugar de
   * escribir todo el código JSX directamente
   */
  const renderizarTarea = ({ item }) => (
    <TarjetaTarea
      tarea={item}
      alPresionar={() => navigation.navigate('DetalleTarea', { idTarea: item.id })}
      alCambiarEstado={() => cambiarEstadoTarea(item.id)}
      alEliminar={() => eliminarTarea(item.id)}
    />
  );

  return (
    <View style={estilos.contenedor}>
      {/* COMPONENTE: EstadisticasTareas */}
      <EstadisticasTareas estadisticas={estadisticas} />

      {/* RENDERIZADO CONDICIONAL */}
      {/* Si no hay tareas, mostrar EstadoVacio */}
      {/* Si hay tareas, mostrar FlatList */}
      {tareas.length === 0 ? (
        <EstadoVacio />
      ) : (
        <FlatList
          data={tareas}
          renderItem={renderizarTarea}
          keyExtractor={(item) => item.id}
          contentContainerStyle={estilos.contenedorLista}
        />
      )}

      {/* COMPONENTE: BotonFlotante */}
      <BotonFlotante
        icono="plus"
        alPresionar={() => navigation.navigate('AgregarTarea')}
      />
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contenedorLista: {
    padding: 16,
  },
});

export default PantallaInicio;
