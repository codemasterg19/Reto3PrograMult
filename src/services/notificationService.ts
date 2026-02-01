import notifee, {AndroidImportance} from '@notifee/react-native';
import {Platform} from 'react-native';

/**
 * Configurar canal de notificaciones para Android
 */
const createNotificationChannel = async () => {
  if (Platform.OS === 'android') {
    await notifee.createChannel({
      id: 'alumnos-channel',
      name: 'Alumnos Notificaciones',
      importance: AndroidImportance.HIGH,
    });
  }
};

/**
 * Solicitar permisos de notificación
 */
export const requestNotificationPermission = async (): Promise<boolean> => {
  try {
    const settings = await notifee.requestPermission();
    return settings.authorizationStatus >= 1; // AUTHORIZED or PROVISIONAL
  } catch (error) {
    console.error('Error al solicitar permisos:', error);
    return false;
  }
};

/**
 * Mostrar notificación local
 */
export const showNotification = async (
  title: string,
  body: string,
): Promise<void> => {
  try {
    // Crear canal si no existe
    await createNotificationChannel();

    // Mostrar notificación
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId: 'alumnos-channel',
        importance: AndroidImportance.HIGH,
        pressAction: {
          id: 'default',
        },
      },
    });
  } catch (error) {
    console.error('Error al mostrar notificación:', error);
  }
};
