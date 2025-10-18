import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { FAB, Card, Text, Chip, IconButton } from 'react-native-paper';
import { useTasks } from '../context/TaskContext';

const HomeScreen = ({ navigation }) => {
  const { tasks, toggleTask, deleteTask, getStats } = useTasks();
  const stats = getStats();

  const renderTask = ({ item }) => (
    <Card
      style={[styles.card, item.completed && styles.completedCard]}
      onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })}
    >
      <Card.Content>
        <View style={styles.taskHeader}>
          <View style={styles.taskInfo}>
            <Text
              variant="titleMedium"
              style={[
                styles.taskTitle,
                item.completed && styles.completedText,
              ]}
            >
              {item.title}
            </Text>
            {item.description ? (
              <Text
                variant="bodySmall"
                style={[
                  styles.taskDescription,
                  item.completed && styles.completedText,
                ]}
                numberOfLines={2}
              >
                {item.description}
              </Text>
            ) : null}
          </View>
          <View style={styles.taskActions}>
            <IconButton
              icon={item.completed ? 'check-circle' : 'circle-outline'}
              iconColor={item.completed ? '#4caf50' : '#757575'}
              size={28}
              onPress={() => toggleTask(item.id)}
            />
            <IconButton
              icon="delete"
              iconColor="#f44336"
              size={24}
              onPress={() => deleteTask(item.id)}
            />
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {/* Estadísticas */}
      <View style={styles.statsContainer}>
        <Chip icon="format-list-checks" style={styles.chip}>
          Total: {stats.total}
        </Chip>
        <Chip icon="clock-outline" style={styles.chip}>
          Pendientes: {stats.pending}
        </Chip>
        <Chip icon="check-circle" style={styles.chip}>
          Completadas: {stats.completed}
        </Chip>
      </View>

      {/* Lista de tareas */}
      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text variant="headlineSmall" style={styles.emptyText}>
            No hay tareas
          </Text>
          <Text variant="bodyMedium" style={styles.emptySubtext}>
            Presiona el botón + para agregar una nueva tarea
          </Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderTask}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {/* Botón flotante para agregar tarea */}
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('AddTask')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 2,
  },
  chip: {
    backgroundColor: '#e3f2fd',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 12,
    elevation: 2,
  },
  completedCard: {
    backgroundColor: '#f1f8e9',
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskInfo: {
    flex: 1,
    marginRight: 8,
  },
  taskTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  taskDescription: {
    color: '#666',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  taskActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    color: '#666',
    marginBottom: 8,
  },
  emptySubtext: {
    color: '#999',
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#6200ee',
  },
});

export default HomeScreen;
