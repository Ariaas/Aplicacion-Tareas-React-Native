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
              iconColor={tarea.completada ? '#4ECDC4' : '#B2BEC3'}
              size={30}
              onPress={alCambiarEstado}
            />
            <IconButton
              icon="delete"
              iconColor="#FF5757"
              size={26}
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
    marginBottom: 16,
    elevation: 6,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#FF6B9D',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    borderWidth: 2,
    borderColor: '#FFE5EF',
  },
  tarjetaCompletada: {
    backgroundColor: '#F0FDFA',
    borderLeftWidth: 6,
    borderLeftColor: '#4ECDC4',
    borderColor: '#C7F9F5',
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
  titulo: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#2D3436',
    fontSize: 16,
  },
  descripcion: {
    color: '#636E72',
    fontSize: 14,
  },
  textoCompletado: {
    textDecorationLine: 'line-through',
    color: '#95A5A6',
  },
  acciones: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TarjetaTarea;
