import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * ========================================
 * CONTEXT API - MANEJO DE ESTADO GLOBAL
 * ========================================
 * 
 * ¿Qué es Context API?
 * - Es una forma de compartir datos entre componentes sin pasar props manualmente
 * - Crea un "estado global" accesible desde cualquier componente
 * - Evita el "prop drilling" (pasar props por muchos niveles)
 * 
 * ¿Cómo funciona?
 * 1. Crear el contexto con createContext()
 * 2. Crear un Provider que envuelve la app
 * 3. Usar useContext() para acceder a los datos desde cualquier componente
 * 
 * En este archivo:
 * - Manejamos todas las tareas de la app
 * - Guardamos y cargamos datos con AsyncStorage
 * - Proporcionamos funciones para CRUD (Crear, Leer, Actualizar, Eliminar)
 */

// 1. CREAR EL CONTEXTO
const ContextoTareas = createContext();

/**
 * HOOK PERSONALIZADO: usarTareas
 * 
 * ¿Qué es un custom hook?
 * - Es una función que usa hooks de React
 * - Permite reutilizar lógica entre componentes
 * - Por convención, empieza con "use"
 * 
 * Este hook facilita el acceso al contexto:
 * En lugar de: const contexto = useContext(ContextoTareas)
 * Usamos: const { tareas, agregarTarea } = usarTareas()
 */
export const usarTareas = () => {
  const contexto = useContext(ContextoTareas);
  if (!contexto) {
    throw new Error('usarTareas debe usarse dentro de ProveedorTareas');
  }
  return contexto;
};

/**
 * PROVIDER: ProveedorTareas
 * 
 * ¿Qué es un Provider?
 * - Es un componente que "provee" datos a sus hijos
 * - Envuelve la app para que todos los componentes accedan al estado
 * - Similar a un "contenedor" de datos global
 */
export const ProveedorTareas = ({ children }) => {
  // ESTADOS
  const [tareas, establecerTareas] = useState([]);
  const [cargando, establecerCargando] = useState(true);

  /**
   * useEffect - CARGAR TAREAS AL INICIAR
   * 
   * useEffect se ejecuta después de que el componente se renderiza
   * El array vacío [] significa: "ejecuta solo una vez al montar"
   */
  useEffect(() => {
    cargarTareas();
  }, []);

  /**
   * useEffect - GUARDAR TAREAS CUANDO CAMBIEN
   * 
   * [tareas] significa: "ejecuta cada vez que 'tareas' cambie"
   * Esto guarda automáticamente las tareas en el dispositivo
   */
  useEffect(() => {
    if (!cargando) {
      guardarTareas();
    }
  }, [tareas]);

  /**
   * FUNCIÓN: cargarTareas
   * 
   * AsyncStorage es como localStorage en web
   * Permite guardar datos en el dispositivo del usuario
   * Los datos persisten incluso si cierras la app
   */
  const cargarTareas = async () => {
    try {
      const tareasGuardadas = await AsyncStorage.getItem('tareas');
      if (tareasGuardadas) {
        establecerTareas(JSON.parse(tareasGuardadas));
      }
    } catch (error) {
      console.error('Error al cargar tareas:', error);
    } finally {
      establecerCargando(false);
    }
  };

  /**
   * FUNCIÓN: guardarTareas
   * 
   * Guarda el array de tareas en AsyncStorage
   * JSON.stringify convierte el objeto a texto
   */
  const guardarTareas = async () => {
    try {
      await AsyncStorage.setItem('tareas', JSON.stringify(tareas));
    } catch (error) {
      console.error('Error al guardar tareas:', error);
    }
  };

  /**
   * FUNCIÓN: agregarTarea
   * 
   * Crea una nueva tarea y la agrega al inicio del array
   * Date.now() genera un ID único basado en el timestamp
   */
  const agregarTarea = (titulo, descripcion) => {
    const nuevaTarea = {
      id: Date.now().toString(),
      titulo,
      descripcion,
      completada: false,
      creadaEn: new Date().toISOString(),
    };
    // Spread operator [...] crea una copia del array con la nueva tarea
    establecerTareas([nuevaTarea, ...tareas]);
  };

  /**
   * FUNCIÓN: cambiarEstadoTarea
   * 
   * Cambia el estado completada de una tarea
   * map() recorre el array y modifica solo la tarea con el id correcto
   */
  const cambiarEstadoTarea = (id) => {
    establecerTareas(
      tareas.map((tarea) =>
        tarea.id === id 
          ? { ...tarea, completada: !tarea.completada } 
          : tarea
      )
    );
  };

  /**
   * FUNCIÓN: eliminarTarea
   * 
   * filter() crea un nuevo array sin la tarea eliminada
   * Mantiene solo las tareas cuyo id NO coincide
   */
  const eliminarTarea = (id) => {
    establecerTareas(tareas.filter((tarea) => tarea.id !== id));
  };

  /**
   * FUNCIÓN: editarTarea
   * 
   * Similar a cambiarEstadoTarea, pero modifica título y descripción
   */
  const editarTarea = (id, titulo, descripcion) => {
    establecerTareas(
      tareas.map((tarea) =>
        tarea.id === id 
          ? { ...tarea, titulo, descripcion } 
          : tarea
      )
    );
  };

  /**
   * FUNCIÓN: obtenerEstadisticas
   * 
   * Calcula estadísticas de las tareas
   * filter() cuenta cuántas tareas cumplen una condición
   */
  const obtenerEstadisticas = () => {
    const total = tareas.length;
    const completadas = tareas.filter((tarea) => tarea.completada).length;
    const pendientes = total - completadas;
    return { total, completadas, pendientes };
  };

  /**
   * VALOR DEL CONTEXTO
   * 
   * Todo lo que pongas aquí estará disponible en cualquier componente
   * que use el hook usarTareas()
   */
  const valorContexto = {
    tareas,
    cargando,
    agregarTarea,
    cambiarEstadoTarea,
    eliminarTarea,
    editarTarea,
    obtenerEstadisticas,
  };

  return (
    <ContextoTareas.Provider value={valorContexto}>
      {children}
    </ContextoTareas.Provider>
  );
};
