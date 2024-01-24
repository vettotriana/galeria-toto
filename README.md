# Galer�a Toto

Galer�a Toto es una aplicaci�n web que es galeria, utilizando React.js y Firebase v9 (BaaS). Permite a los usuarios compartir sus fotos, comentar y dar me gusta a las publicaciones de otros. Tambi�n pueden explorar y seguir los perfiles de otros usuarios.


## Caracter�sticas de este Clon
 - Registro e inicio de sesi�n con autenticaci�n por correo electr�nico y contrase�a.
 - Publicar una imagen con descripci�n.
 - Dar me gusta/no me gusta, comentar y compartir cualquier publicaci�n.
 - Dise�o de m�ltiples p�ginas (p�gina de inicio y de exploraci�n).
 - Completamente adaptable a dispositivos m�viles.
 - Seguir y dejar de seguir usuarios.
 - P�gina de perfil del usuario.
 - Inicio de sesi�n con Facebook.
 - Buscar usuarios por nombre de usuario.
 - Hacer clic en el nombre de usuario para ver ese perfil.
 - Verificaci�n de correo electr�nico.
 - Mostrar usuarios aleatorios en la lista de sugerencias.
 - A�adir desplazamiento infinito hasta cargar todas las publicaciones.


## Tecnolog�a Utilizada
 - React.js
 - CSS3
 - Firebase v9
 - React Router DOM
 - Esqueleto de Carga de React
 - Iconos de React


## Empezando con Create React App
Este proyecto se inici� con [Create React App](https://github.com/facebook/create-react-app).
Clona este repositorio. Necesitar�s `node.js` y `git` instalados globalmente en tu m�quina.

## Instrucciones de instalaci�n y configuraci�n
1. Instalaci�n: `npm install`
2. En el directorio del proyecto, puedes ejecutar: `npm start`

Ejecuta la aplicaci�n en modo de desarrollo.\
Abre [http://localhost:3000](http://localhost:3000) para verla en tu navegador.
La p�gina se recargar� si haces cambios.\
Tambi�n podr�s ver errores de lint en la consola.

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