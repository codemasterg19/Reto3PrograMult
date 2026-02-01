import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Screen = 'Home' | 'Form' | 'List';

type Props = {
  currentScreen: Screen;
  navigate: (screen: Screen) => void;
};

export const TabBar = ({ currentScreen, navigate }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.tab} onPress={() => navigate('Home')}>
        <MaterialIcons
          name="home"
          size={24}
          color={currentScreen === 'Home' ? '#007AFF' : '#999'}
        />
        <Text
          style={[styles.label, currentScreen === 'Home' && styles.activeLabel]}
        >
          Inicio
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={() => navigate('Form')}>
        <MaterialIcons
          name="person-add"
          size={24}
          color={currentScreen === 'Form' ? '#007AFF' : '#999'}
        />
        <Text
          style={[styles.label, currentScreen === 'Form' && styles.activeLabel]}
        >
          Agregar
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tab} onPress={() => navigate('List')}>
        <MaterialIcons
          name="list"
          size={24}
          color={currentScreen === 'List' ? '#007AFF' : '#999'}
        />
        <Text
          style={[styles.label, currentScreen === 'List' && styles.activeLabel]}
        >
          Alumnos
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingBottom: 5,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  label: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  activeLabel: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
