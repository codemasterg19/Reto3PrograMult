import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ScreenHeader} from '../components/ScreenHeader';
import {validateEmail, validateRequired} from '../utils/validators';
import {addAlumno} from '../services/alumnosService';
import {showNotification} from '../services/notificationService';

type Props = {
  navigate: (screen: 'Home' | 'Form' | 'List') => void;
};

const FormScreen = ({navigate}: Props) => {
  const [matricula, setMatricula] = useState('');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [diplomado, setDiplomado] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Validaciones
    if (!validateRequired(matricula)) {
      Alert.alert('Error', 'La matrícula es obligatoria');
      return;
    }
    if (!validateRequired(nombre)) {
      Alert.alert('Error', 'El nombre es obligatorio');
      return;
    }
    if (!validateRequired(correo)) {
      Alert.alert('Error', 'El correo es obligatorio');
      return;
    }
    if (!validateEmail(correo)) {
      Alert.alert('Error', 'El correo no tiene un formato válido');
      return;
    }
    if (!validateRequired(diplomado)) {
      Alert.alert('Error', 'El diplomado es obligatorio');
      return;
    }

    setLoading(true);
    try {
      await addAlumno({
        matricula: matricula.trim(),
        nombre: nombre.trim(),
        correo: correo.trim(),
        diplomado: diplomado.trim(),
      });

      // Notificación de éxito
      await showNotification(
        'Alumno Agregado',
        `${nombre} ha sido registrado exitosamente`,
      );

      // Limpiar formulario
      setMatricula('');
      setNombre('');
      setCorreo('');
      setDiplomado('');

      Alert.alert('Éxito', 'Alumno agregado correctamente');
    } catch (error) {
      console.error('Error al agregar alumno:', error);
      Alert.alert('Error', 'No se pudo agregar el alumno');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ScreenHeader title="Agregar Alumno" onBack={() => navigate('Home')} />
      <View style={styles.form}>
        <Text style={styles.label}>Matrícula *</Text>
        <TextInput
          style={styles.input}
          value={matricula}
          onChangeText={setMatricula}
          placeholder="Ej: 2024001"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Nombre Completo *</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
          placeholder="Ej: Juan Pérez García"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Correo Electrónico *</Text>
        <TextInput
          style={styles.input}
          value={correo}
          onChangeText={setCorreo}
          placeholder="Ej: juan@example.com"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Diplomado *</Text>
        <TextInput
          style={styles.input}
          value={diplomado}
          onChangeText={setDiplomado}
          placeholder="Ej: Desarrollo Móvil"
          placeholderTextColor="#999"
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading}>
          <MaterialIcons name="save" size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>
            {loading ? 'Guardando...' : 'Guardar Alumno'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 15,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default FormScreen;
