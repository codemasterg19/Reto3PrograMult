import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {getFirestoreInstance} from '../config/firebase';

export interface Alumno {
  id: string;
  matricula: string;
  nombre: string;
  correo: string;
  diplomado: string;
}

export interface AlumnoInput {
  matricula: string;
  nombre: string;
  correo: string;
  diplomado: string;
}

const COLLECTION_NAME = 'alumnos';

// Obtener instancia de Firestore
const getDb = () => getFirestoreInstance();

/**
 * Agregar un nuevo alumno a Firestore
 */
export const addAlumno = async (alumno: AlumnoInput): Promise<void> => {
  try {
    const db = getDb();
    const alumnosRef = collection(db, COLLECTION_NAME);
    await addDoc(alumnosRef, {
      ...alumno,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error al agregar alumno:', error);
    throw error;
  }
};

/**
 * Obtener alumnos en tiempo real con onSnapshot
 * @param callback Función que recibe el array de alumnos actualizado
 * @returns Función para cancelar la suscripción
 */
export const getAlumnos = (
  callback: (alumnos: Alumno[]) => void,
): (() => void) => {
  const db = getDb();
  const alumnosRef = collection(db, COLLECTION_NAME);
  const q = query(alumnosRef, orderBy('createdAt', 'desc'));

  const unsubscribe = onSnapshot(
    q,
    querySnapshot => {
      const alumnos: Alumno[] = [];
      querySnapshot.forEach(
        (docSnapshot: FirebaseFirestoreTypes.QueryDocumentSnapshot) => {
          alumnos.push({
            id: docSnapshot.id,
            ...docSnapshot.data(),
          } as Alumno);
        },
      );
      callback(alumnos);
    },
    error => {
      console.error('Error al obtener alumnos:', error);
    },
  );

  return unsubscribe;
};

/**
 * Eliminar un alumno por ID
 */
export const deleteAlumno = async (id: string): Promise<void> => {
  try {
    const db = getDb();
    const alumnoRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(alumnoRef);
  } catch (error) {
    console.error('Error al eliminar alumno:', error);
    throw error;
  }
};
