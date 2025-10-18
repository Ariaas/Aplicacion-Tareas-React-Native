# 📱 App de Tareas

Aplicación móvil de gestión de tareas construida con React Native y Expo.

## ✨ Características

- ✅ Crear, editar y eliminar tareas
- ✅ Marcar tareas como completadas
- ✅ Persistencia de datos local con AsyncStorage
- ✅ Estadísticas en tiempo real
- ✅ Interfaz moderna con Material Design
- ✅ Compatible con iOS, Android y Web

## 🛠️ Tecnologías

- **React Native** - Framework móvil
- **Expo SDK 54** - Herramientas de desarrollo
- **React Navigation** - Navegación entre pantallas
- **React Native Paper** - Componentes UI Material Design
- **AsyncStorage** - Almacenamiento local
- **Context API** - Manejo de estado global

## 📂 Estructura del Proyecto

```
src/
├── componentes/              # Componentes reutilizables
│   ├── TarjetaTarea.js
│   ├── EstadisticasTareas.js
│   ├── EstadoVacio.js
│   ├── BotonFlotante.js
│   └── CampoTexto.js
├── contexto/
│   └── ContextoTareas.js     # Estado global
├── navegacion/
│   └── NavegadorApp.js       # Configuración de rutas
└── pantallas/
    ├── PantallaInicio.js
    ├── PantallaAgregarTarea.js
    └── PantallaDetalleTarea.js
```

## 🚀 Instalación

### Prerrequisitos
- Node.js v14 o superior
- npm o yarn

### Pasos

1. **Clonar el repositorio**
```bash
git clone <url-del-repo>
cd App-Electiva
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar el proyecto**
```bash
npm start
```

4. **Ejecutar en dispositivo**
- **Web**: Presiona `w` en la terminal
- **Android**: Presiona `a` o escanea el QR con Expo Go
- **iOS**: Presiona `i` o escanea el QR con la cámara

## 📱 Capturas de Pantalla

<!-- Agrega capturas de pantalla aquí -->

## 🎯 Funcionalidades

### Gestión de Tareas
- Crear nuevas tareas con título y descripción
- Ver lista de todas las tareas
- Editar tareas existentes
- Eliminar tareas
- Marcar tareas como completadas/pendientes

### Estadísticas
- Total de tareas
- Tareas pendientes
- Tareas completadas

### Persistencia
- Los datos se guardan automáticamente en el dispositivo
- Las tareas persisten entre sesiones

## 🏗️ Arquitectura

### Componentes Reutilizables
El proyecto utiliza componentización para mantener el código limpio y reutilizable.

### Context API
Manejo de estado global sin prop drilling, facilitando el acceso a las tareas desde cualquier componente.

### React Navigation
Stack Navigator para navegación fluida entre pantallas con animaciones nativas.

## 📄 Licencia

MIT

## 👤 Autor

[Tu nombre]

---

**Nota**: Esta aplicación fue desarrollada con fines educativos.
