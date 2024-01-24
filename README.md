# Galería Toto

Galería Toto es una aplicación web que es galeria, utilizando React.js y Firebase v9 (BaaS). Permite a los usuarios compartir sus fotos, comentar y dar me gusta a las publicaciones de otros. También pueden explorar y seguir los perfiles de otros usuarios.


## Características
 - Registro e inicio de sesión con autenticación por correo electrónico y contraseña.
 - Publicar una imagen con descripción.
 - Dar me gusta/no me gusta, comentar y compartir cualquier publicación.
 - Diseño de múltiples páginas (página de inicio y de exploración).
 - Completamente adaptable a dispositivos móviles.
 - Seguir y dejar de seguir usuarios.
 - Página de perfil del usuario.
 - Inicio de sesión con Facebook.
 - Buscar usuarios por nombre de usuario.
 - Hacer clic en el nombre de usuario para ver ese perfil.
 - Verificación de correo electrónico.
 - Mostrar usuarios aleatorios en la lista de sugerencias.
 - Añadir desplazamiento infinito hasta cargar todas las publicaciones.


## Tecnología Utilizada
 - React.js
 - CSS3
 - Firebase v9
 - React Router DOM
 - Esqueleto de Carga de React
 - Iconos de React


## Empezando con Create React App
Este proyecto se inició con [Create React App](https://github.com/facebook/create-react-app).
Clona este repositorio. Necesitarás `node.js` y `git` instalados globalmente en tu máquina.

## Instrucciones de instalación y configuración
1. Instalación: `npm install`
2. En el directorio del proyecto, puedes ejecutar: `npm start`

Ejecuta la aplicación en modo de desarrollo.\
Abre [http://localhost:3000](http://localhost:3000) para verla en tu navegador.
La página se recargará si haces cambios.\
También podrás ver errores de lint en la consola.

## Opcionales
1. el archivo FirebaseConfig.js en la carpeta config, estan los endpoints de firebase, no olvidar activar en firebase los servicios de firestore database, auhentication y storage
2. permisos: los permisos o reglas deben cambiarse a:

en firestore database:

rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time > timestamp.date(2020, 9, 10);
    }
  }
}

en storage:

rules_version = '2';

// Craft rules based on data in your Firestore database
// allow write: if firestore.get(
//    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
            allow read, write: if request.time > timestamp.date(2020, 9, 10);

    }
  }
}
