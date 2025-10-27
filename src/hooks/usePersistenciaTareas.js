import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setTareas, setCargando, selectTareas } from '../store/tareasSlice';

export const usePersistenciaTareas = () => {
  const dispatch = useDispatch();
  const tareas = useSelector(selectTareas);

  useEffect(() => {
    cargarTareas();
  }, []);

  useEffect(() => {
    guardarTareas();
  }, [tareas]);

  const cargarTareas = async () => {
    try {
      dispatch(setCargando(true));
      const tareasGuardadas = await AsyncStorage.getItem('tareas');
      if (tareasGuardadas) {
        dispatch(setTareas(JSON.parse(tareasGuardadas)));
      } else {
        dispatch(setCargando(false));
      }
    } catch (error) {
      console.error('Error al cargar tareas:', error);
      dispatch(setCargando(false));
    }
  };

  const guardarTareas = async () => {
    try {
      await AsyncStorage.setItem('tareas', JSON.stringify(tareas));
    } catch (error) {
      console.error('Error al guardar tareas:', error);
    }
  };
};
