import {getApp} from '@react-native-firebase/app';
import {getFirestore} from '@react-native-firebase/firestore';

let firestoreInstance: ReturnType<typeof getFirestore> | null = null;

/**
 * Obtener instancia de Firestore de forma segura
 */
export const getFirestoreInstance = () => {
  if (!firestoreInstance) {
    try {
      const app = getApp();
      firestoreInstance = getFirestore(app);
      
      // Configurar settings para reducir tráfico
      firestoreInstance.settings({
        cacheSizeBytes: 1048576, // 1 MB
        persistence: true,
      });
    } catch (error) {
      console.error('Error al inicializar Firestore:', error);
      throw error;
    }
  }
  return firestoreInstance;
};
