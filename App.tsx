/**
 * AlumnosFirebaseApp
 * App de gestión de alumnos con Firebase Firestore
 */

import React, {useState, useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import FormScreen from './src/screens/FormScreen';
import ListScreen from './src/screens/ListScreen';
import {TabBar} from './src/components/TabBar';
import {requestNotificationPermission} from './src/services/notificationService';

type Screen = 'Home' | 'Form' | 'List';

function App(): React.JSX.Element {
  const [currentScreen, setCurrentScreen] = useState<Screen>('Home');

  useEffect(() => {
    // Solicitar permisos de notificación al iniciar
    requestNotificationPermission();
  }, []);

  const navigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return <HomeScreen navigate={navigate} />;
      case 'Form':
        return <FormScreen navigate={navigate} />;
      case 'List':
        return <ListScreen navigate={navigate} />;
      default:
        return <HomeScreen navigate={navigate} />;
    }
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar barStyle="dark-content" backgroundColor="#007AFF" />
      {renderScreen()}
      {currentScreen !== 'Home' && (
        <TabBar currentScreen={currentScreen} navigate={navigate} />
      )}
    </View>
  );
}

export default App;
