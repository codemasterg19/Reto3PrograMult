import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
  navigate: (screen: 'Home' | 'Form' | 'List') => void;
};

const HomeScreen = ({navigate}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de alumnos</Text>
      <Text style={styles.subtitle}>Programación-Multiplataforma</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate('Form')}>
          <MaterialIcons name="person-add" size={28} color="#FFFFFF" />
          <Text style={styles.buttonText}>Registrar Alumno</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigate('List')}>
          <MaterialIcons name="list" size={28} color="#FFFFFF" />
          <Text style={styles.buttonText}>Ver Alumnos Inscritos</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>Desarrollado por Pablo Jiménez</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 50,
  },
  buttonContainer: {
    width: '100%',
    gap: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  buttonIcon: {
    fontSize: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    marginTop: 50,
    fontSize: 12,
    color: '#999',
  },
});

export default HomeScreen;
