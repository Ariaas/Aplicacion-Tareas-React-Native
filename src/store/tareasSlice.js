import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tareas: [],
  cargando: false,
};

const tareasSlice = createSlice({
  name: 'tareas',
  initialState,
  reducers: {
    setTareas: (state, action) => {
      state.tareas = action.payload;
      state.cargando = false;
    },
    setCargando: (state, action) => {
      state.cargando = action.payload;
    },
    agregarTarea: (state, action) => {
      const nuevaTarea = {
        id: Date.now().toString(),
        titulo: action.payload.titulo,
        descripcion: action.payload.descripcion,
        completada: false,
        creadaEn: new Date().toISOString(),
      };
      state.tareas.unshift(nuevaTarea);
    },
    cambiarEstadoTarea: (state, action) => {
      const tarea = state.tareas.find(t => t.id === action.payload);
      if (tarea) {
        tarea.completada = !tarea.completada;
      }
    },
    eliminarTarea: (state, action) => {
      state.tareas = state.tareas.filter(t => t.id !== action.payload);
    },
    editarTarea: (state, action) => {
      const tarea = state.tareas.find(t => t.id === action.payload.id);
      if (tarea) {
        tarea.titulo = action.payload.titulo;
        tarea.descripcion = action.payload.descripcion;
      }
    },
  },
});

export const {
  setTareas,
  setCargando,
  agregarTarea,
  cambiarEstadoTarea,
  eliminarTarea,
  editarTarea,
} = tareasSlice.actions;

export const selectTareas = (state) => state.tareas.tareas;
export const selectCargando = (state) => state.tareas.cargando;
export const selectEstadisticas = (state) => {
  const total = state.tareas.tareas.length;
  const completadas = state.tareas.tareas.filter(t => t.completada).length;
  const pendientes = total - completadas;
  return { total, completadas, pendientes };
};

export default tareasSlice.reducer;
