import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import { useTasks } from '../context/TaskContext';

const AddTaskScreen = ({ navigation }) => {
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const handleAddTask = () => {
    // Validación
    if (title.trim() === '') {
      setSnackbarVisible(true);
      return;
    }

    // Agregar tarea usando el contexto
    addTask(title.trim(), description.trim());

    // Limpiar formulario
    setTitle('');
    setDescription('');

    // Navegar de regreso a Home
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <Text variant="titleLarge" style={styles.header}>
            Crear Nueva Tarea
          </Text>

          <TextInput
            label="Título *"
            value={title}
            onChangeText={setTitle}
            mode="outlined"
            style={styles.input}
            placeholder="Ej: Comprar leche"
            maxLength={50}
          />

          <TextInput
            label="Descripción (opcional)"
            value={description}
            onChangeText={setDescription}
            mode="outlined"
            multiline
            numberOfLines={4}
            style={styles.input}
            placeholder="Agrega detalles sobre la tarea..."
            maxLength={200}
          />

          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={handleAddTask}
              style={styles.button}
              icon="check"
            >
              Guardar Tarea
            </Button>

            <Button
              mode="outlined"
              onPress={() => navigation.goBack()}
              style={styles.button}
              icon="close"
            >
              Cancelar
            </Button>
          </View>
        </View>
      </ScrollView>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        action={{
          label: 'OK',
          onPress: () => setSnackbarVisible(false),
        }}
      >
        El título es obligatorio
      </Snackbar>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
  },
  formContainer: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    marginTop: 8,
  },
  button: {
    marginVertical: 8,
  },
});

export default AddTaskScreen;
