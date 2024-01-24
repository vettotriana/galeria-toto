import { initializeApp } from 'firebase/app'; // Importa la funci�n para inicializar una aplicaci�n Firebase.
import { getAuth } from 'firebase/auth'; // Importa la funci�n para obtener la instancia de autenticaci�n de Firebase.
import { getFirestore } from "firebase/firestore"; // Importa la funci�n para obtener la instancia de Firestore.
import { getStorage } from "firebase/storage"; // Importa la funci�n para obtener la instancia de almacenamiento de Firebase.

// Configuraci�n de Firebase.
const firebaseConfig = {
    apiKey: "AIzaSyAobbRnNhP9V5sCIbNoVCa-7C1nPoGYInE", //  clave API de Firebase.
    authDomain: "galeria-toto.firebaseapp.com", // El dominio de autenticaci�n de Firebase.
    projectId: "galeria-toto", // El ID del proyecto de Firebase.
    storageBucket: "galeria-toto.appspot.com", // El bucket de almacenamiento de Firebase.
    messagingSenderId: "94741661620", // El ID del remitente para la mensajer�a.
    appId: "1:94741661620:web:22eddfbf9cff5fa48394e1" // El ID de la aplicaci�n de Firebase.
};

// Inicializa la aplicaci�n Firebase con la configuraci�n proporcionada.
const app = initializeApp(firebaseConfig);

// Obtiene la instancia de autenticaci�n de Firebase.
const auth = getAuth(app);

// Obtiene la instancia de Firestore (base de datos).
const db = getFirestore(app);

// Obtiene la instancia de almacenamiento de Firebase.
const storage = getStorage(app);

// Exporta las instancias para su uso en otras partes de la aplicaci�n.
export { app, auth, db, storage };
