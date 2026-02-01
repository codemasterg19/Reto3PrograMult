import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ScreenHeader} from '../components/ScreenHeader';
import {getAlumnos, deleteAlumno, Alumno} from '../services/alumnosService';

type Props = {
  navigate: (screen: 'Home' | 'Form' | 'List') => void;
};

const ListScreen = ({navigate}: Props) => {
  const [alumnos, setAlumnos] = useState<Alumno[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Suscripción en tiempo real
    const unsubscribe = getAlumnos(fetchedAlumnos => {
      setAlumnos(fetchedAlumnos);
      setLoading(false);
    });

    // Cleanup: cancelar suscripción al desmontar
    return () => unsubscribe();
  }, []);

  const handleDelete = (id: string, nombre: string) => {
    Alert.alert(
      'Confirmar Eliminación',
      `¿Estás seguro de eliminar a ${nombre}?`,
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteAlumno(id);
              Alert.alert('Éxito', 'Alumno eliminado correctamente');
            } catch (error) {
              console.error('Error al eliminar:', error);
              Alert.alert('Error', 'No se pudo eliminar el alumno');
            }
          },
        },
      ],
    );
  };

  const renderItem = ({item}: {item: Alumno}) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.nombre}</Text>
        <Text style={styles.detail}>📋 Matrícula: {item.matricula}</Text>
        <Text style={styles.detail}>📧 {item.correo}</Text>
        <Text style={styles.detail}>🎓 {item.diplomado}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id, item.nombre)}>
        <MaterialIcons name="delete" size={20} color="#FFFFFF" />
        <Text style={styles.deleteButtonText}>Eliminar Alumno</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Lista de Alumnos" onBack={() => navigate('Home')} />
        <View style={styles.centerContainer}>
          <Text style={styles.loadingText}>Cargando alumnos...</Text>
        </View>
      </View>
    );
  }

  if (alumnos.length === 0) {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Lista de Alumnos" onBack={() => navigate('Home')} />
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>No hay alumnos registrados</Text>
          <Text style={styles.emptySubtext}>
            Usa el formulario para agregar alumnos
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScreenHeader title="Lista de Alumnos" onBack={() => navigate('Home')} />
      <FlatList
        data={alumnos}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  list: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  detail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
  },
});

export default ListScreen;
