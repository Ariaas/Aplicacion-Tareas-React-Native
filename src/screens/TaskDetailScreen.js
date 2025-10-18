import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Button, Chip, Portal, Dialog, TextInput } from 'react-native-paper';
import { useTasks } from '../context/TaskContext';

const TaskDetailScreen = ({ route, navigation }) => {
  const { taskId } = route.params;
  const { tasks, toggleTask, deleteTask, editTask } = useTasks();
  const task = tasks.find((t) => t.id === taskId);

  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // Si la tarea no existe, mostrar mensaje
  if (!task) {
    return (
      <View style={styles.container}>
        <Text variant="headlineSmall">Tarea no encontrada</Text>
      </View>
    );
  }

  const handleEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setEditDialogVisible(true);
  };

  const handleSaveEdit = () => {
    if (editTitle.trim() !== '') {
      editTask(task.id, editTitle.trim(), editDescription.trim());
      setEditDialogVisible(false);
    }
  };

  const handleDelete = () => {
    deleteTask(task.id);
    navigation.goBack();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          {/* Estado de la tarea */}
          <View style={styles.statusContainer}>
            <Chip
              icon={task.completed ? 'check-circle' : 'clock-outline'}
              style={[
                styles.statusChip,
                task.completed ? styles.completedChip : styles.pendingChip,
              ]}
            >
              {task.completed ? 'Completada' : 'Pendiente'}
            </Chip>
          </View>

          {/* Título */}
          <Text variant="headlineMedium" style={styles.title}>
            {task.title}
          </Text>

          {/* Descripción */}
          {task.description ? (
            <View style={styles.section}>
              <Text variant="titleMedium" style={styles.sectionTitle}>
                Descripción
              </Text>
              <Text variant="bodyLarge" style={styles.description}>
                {task.description}
              </Text>
            </View>
          ) : (
            <Text variant="bodyMedium" style={styles.noDescription}>
              Sin descripción
            </Text>
          )}

          {/* Fecha de creación */}
          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Fecha de creación
            </Text>
            <Text variant="bodyMedium" style={styles.date}>
              {formatDate(task.createdAt)}
            </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Botones de acción */}
      <View style={styles.actionsContainer}>
        <Button
          mode="contained"
          icon={task.completed ? 'close-circle' : 'check-circle'}
          onPress={() => toggleTask(task.id)}
          style={styles.actionButton}
        >
          {task.completed ? 'Marcar como Pendiente' : 'Marcar como Completada'}
        </Button>

        <Button
          mode="outlined"
          icon="pencil"
          onPress={handleEdit}
          style={styles.actionButton}
        >
          Editar Tarea
        </Button>

        <Button
          mode="contained"
          icon="delete"
          onPress={handleDelete}
          style={[styles.actionButton, styles.deleteButton]}
          buttonColor="#f44336"
        >
          Eliminar Tarea
        </Button>
      </View>

      {/* Dialog para editar */}
      <Portal>
        <Dialog visible={editDialogVisible} onDismiss={() => setEditDialogVisible(false)}>
          <Dialog.Title>Editar Tarea</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Título"
              value={editTitle}
              onChangeText={setEditTitle}
              mode="outlined"
              style={styles.dialogInput}
            />
            <TextInput
              label="Descripción"
              value={editDescription}
              onChangeText={setEditDescription}
              mode="outlined"
              multiline
              numberOfLines={3}
              style={styles.dialogInput}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setEditDialogVisible(false)}>Cancelar</Button>
            <Button onPress={handleSaveEdit}>Guardar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 16,
    elevation: 4,
  },
  statusContainer: {
    marginBottom: 16,
  },
  statusChip: {
    alignSelf: 'flex-start',
  },
  completedChip: {
    backgroundColor: '#c8e6c9',
  },
  pendingChip: {
    backgroundColor: '#fff9c4',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#666',
  },
  description: {
    color: '#333',
    lineHeight: 24,
  },
  noDescription: {
    color: '#999',
    fontStyle: 'italic',
  },
  date: {
    color: '#666',
  },
  actionsContainer: {
    padding: 16,
  },
  actionButton: {
    marginVertical: 8,
  },
  deleteButton: {
    marginTop: 16,
  },
  dialogInput: {
    marginBottom: 12,
  },
});

export default TaskDetailScreen;
