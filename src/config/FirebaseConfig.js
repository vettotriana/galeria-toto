import { initializeApp } from 'firebase/app'; // Importa la función para inicializar una aplicación Firebase.
import { getAuth } from 'firebase/auth'; // Importa la función para obtener la instancia de autenticación de Firebase.
import { getFirestore } from "firebase/firestore"; // Importa la función para obtener la instancia de Firestore.
import { getStorage } from "firebase/storage"; // Importa la función para obtener la instancia de almacenamiento de Firebase.

// Configuración de Firebase.
const firebaseConfig = {
    apiKey: "AIzaSyAobbRnNhP9V5sCIbNoVCa-7C1nPoGYInE", //  clave API de Firebase.
    authDomain: "galeria-toto.firebaseapp.com", // El dominio de autenticación de Firebase.
    projectId: "galeria-toto", // El ID del proyecto de Firebase.
    storageBucket: "galeria-toto.appspot.com", // El bucket de almacenamiento de Firebase.
    messagingSenderId: "94741661620", // El ID del remitente para la mensajería.
    appId: "1:94741661620:web:22eddfbf9cff5fa48394e1" // El ID de la aplicación de Firebase.
};

// Inicializa la aplicación Firebase con la configuración proporcionada.
const app = initializeApp(firebaseConfig);

// Obtiene la instancia de autenticación de Firebase.
const auth = getAuth(app);

// Obtiene la instancia de Firestore (base de datos).
const db = getFirestore(app);

// Obtiene la instancia de almacenamiento de Firebase.
const storage = getStorage(app);

// Exporta las instancias para su uso en otras partes de la aplicación.
export { app, auth, db, storage };
