import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';

const TarjetaTarea = ({ tarea, alPresionar, alCambiarEstado, alEliminar }) => {
  return (
    <Card
      style={[estilos.tarjeta, tarea.completada && estilos.tarjetaCompletada]}
      onPress={alPresionar}
    >
      <Card.Content>
        <View style={estilos.encabezado}>
          <View style={estilos.infoTarea}>
            <Text
              variant="titleMedium"
              style={[
                estilos.titulo,
                tarea.completada && estilos.textoCompletado,
              ]}
            >
              {tarea.titulo}
            </Text>
            
            {tarea.descripcion ? (
              <Text
                variant="bodySmall"
                style={[
                  estilos.descripcion,
                  tarea.completada && estilos.textoCompletado,
                ]}
                numberOfLines={2}
              >
                {tarea.descripcion}
              </Text>
            ) : null}
          </View>

          <View style={estilos.acciones}>
            <IconButton
              icon={tarea.completada ? 'check-circle' : 'circle-outline'}
              iconColor={tarea.completada ? '#4caf50' : '#757575'}
              size={28}
              onPress={alCambiarEstado}
            />
            <IconButton
              icon="delete"
              iconColor="#f44336"
              size={24}
              onPress={alEliminar}
            />
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const estilos = StyleSheet.create({
  tarjeta: {
    marginBottom: 12,
    elevation: 2,
  },
  tarjetaCompletada: {
    backgroundColor: '#f1f8e9',
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoTarea: {
    flex: 1,
    marginRight: 8,
  },
  taskTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#000000',  // Negro para mejor contraste
  },
  taskDescription: {
    color: '#444444',  // Gris oscuro (antes era muy claro)
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888888',  // Gris medio (antes era muy claro)
  },
  acciones: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TarjetaTarea;
