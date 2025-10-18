import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Crear el contexto
const TaskContext = createContext();

// Hook personalizado para usar el contexto fácilmente
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks debe usarse dentro de TaskProvider');
  }
  return context;
};

// Provider que envuelve la app y proporciona el estado global
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar tareas desde AsyncStorage al iniciar
  useEffect(() => {
    loadTasks();
  }, []);

  // Guardar tareas en AsyncStorage cada vez que cambien
  useEffect(() => {
    if (!loading) {
      saveTasks();
    }
  }, [tasks]);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Error al cargar tareas:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error al guardar tareas:', error);
    }
  };

  // Agregar una nueva tarea
  const addTask = (title, description) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
  };

  // Marcar tarea como completada/no completada
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Eliminar una tarea
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Editar una tarea
  const editTask = (id, title, description) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, title, description } : task
      )
    );
  };

  // Obtener estadísticas
  const getStats = () => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        addTask,
        toggleTask,
        deleteTask,
        editTask,
        getStats,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
