import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { cambiarEstadoTarea, eliminarTarea, selectTareas, selectEstadisticas } from '../store/tareasSlice';
import { usePersistenciaTareas } from '../hooks/usePersistenciaTareas';

import TarjetaTarea from '../componentes/TarjetaTarea';
import EstadisticasTareas from '../componentes/EstadisticasTareas';
import EstadoVacio from '../componentes/EstadoVacio';
import BotonFlotante from '../componentes/BotonFlotante';

const PantallaInicio = ({ navigation }) => {
  const dispatch = useDispatch();
  const tareas = useSelector(selectTareas);
  const estadisticas = useSelector(selectEstadisticas);
  
  usePersistenciaTareas();

  const renderizarTarea = ({ item }) => (
    <TarjetaTarea
      tarea={item}
      alPresionar={() => navigation.navigate('DetalleTarea', { idTarea: item.id })}
      alCambiarEstado={() => dispatch(cambiarEstadoTarea(item.id))}
      alEliminar={() => dispatch(eliminarTarea(item.id))}
    />
  );

  return (
    <View style={estilos.contenedor}>
      <EstadisticasTareas estadisticas={estadisticas} />

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
    backgroundColor: '#FFF5F7',
  },
  contenedorLista: {
    padding: 16,
    paddingBottom: 80,
  },
});

export default PantallaInicio;
