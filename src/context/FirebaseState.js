import React, { useEffect, useState } from "react";
import firebaseContex from "./FirebaseContex"; // Importa el contexto de Firebase.
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    FacebookAuthProvider,
    signInWithPopup,
} from "firebase/auth"; // Importa funciones de autenticación de Firebase.
import { auth } from "../config/FirebaseConfig"; // Importa la configuración de autenticación de Firebase.
import {
    collection,
    getCountFromServer,
    limit,
    onSnapshot,
    orderBy,
    query,
    where,
} from "firebase/firestore"; // Importa funciones de Firestore.
import { db } from "../config/FirebaseConfig"; // Importa la configuración de Firestore.

// Componente FirebaseState para gestionar el estado global relacionado con Firebase.
const FirebaseState = ({ children }) => {
    const localUser = JSON.parse(localStorage.getItem("authUser")); // Obtiene el usuario actual del almacenamiento local.
    const [user, setUser] = useState(localUser); // Estado para almacenar el usuario actual.
    const [posts, setPosts] = useState([]); // Estado para almacenar las publicaciones.
    const [allUsers, setAllUsers] = useState([]); // Estado para almacenar todos los usuarios.
    const [postLimit, setPostLimit] = useState(10); // Estado para el límite de publicaciones.
    const [postCount, setPostCount] = useState(null); // Estado para el conteo total de publicaciones.
    const [isUpload, setIsUpload] = useState(false); // Estado para el control del modelo de subida.
    const [isSearch, setIsSearch] = useState(false); // Estado para el control del modelo de búsqueda.
    const [loading, setLoading] = useState(true); // Estado para el control de carga.

    // Función para registrar usuarios.
    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Función para iniciar sesión con email y contraseña.
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Función para iniciar sesión con Facebook.
    const facebookLogin = () => {
        const provider = new FacebookAuthProvider();
        return signInWithPopup(auth, provider);
    };

    // Función para cerrar sesión.
    const logout = () => {
        localStorage.removeItem("authUser");
        setUser(null);
        return signOut(auth);
    };

    // Función para obtener publicaciones ordenadas por fecha.
    const getPostsByLimit = () => {
        const postRef = collection(db, "posts");
        const q = query(postRef, orderBy("datePostedOn", "desc"), limit(postLimit));
        onSnapshot(q, (querySnapshot) => {
            setPosts(querySnapshot.docs);
            setLoading(false);
        });
    };

    // Función para obtener el conteo total de publicaciones.
    const getPostCount = async () => {
        const coll = collection(db, "posts");
        const snapshot = await getCountFromServer(coll);
        setPostCount(snapshot.data().count);
    };

    // Función para obtener todos los usuarios.
    const getAllUsers = () => {
        const q = query(collection(db, "userinfo"));

        onSnapshot(q, (querySnapshot) => {
            setAllUsers(querySnapshot.docs);
            setLoading(false);
        });
    };

    // Función para obtener usuarios sugeridos.
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const getRandomUsers = () => {
        if (!localUser) return;
        const q = query(
            collection(db, "userinfo"),
            where("username", "!=", localUser.displayName),
            limit(5)
        );

        onSnapshot(q, (querySnapshot) => {
            setSuggestedUsers(querySnapshot.docs);
            setLoading(false);
        });
    };

    // Efecto para manejar cambios en el estado de autenticación.
    useEffect(() => {
        const unsubscribe = () =>
            onAuthStateChanged(auth, (currentUser) => {
                if (currentUser) {
                    localStorage.setItem("authUser", JSON.stringify(currentUser));
                } else {
                    localStorage.removeItem("authUser");
                    setUser(null);
                }
            });
        return () => {
            unsubscribe();
        };
    }, []);

    // Efectos para obtener publicaciones, conteo de publicaciones y usuarios.
    useEffect(() => {
        getPostsByLimit();
    }, [postLimit]);

    useEffect(() => {
        getPostCount();
        getAllUsers();
        getRandomUsers();
    }, []);

    // Proveedor del contexto que envuelve a los hijos del componente.
    return (
        <firebaseContex.Provider
            value={{
                signup,
                login,
                logout,
                user,
                posts,
                allUsers,
                isUpload,
                setIsUpload,
                loading,
                setLoading,
                facebookLogin,
                isSearch,
                setIsSearch,
                suggestedUsers,
                setPostLimit,
                postLimit,
                postCount,
            }}
        >
            {children}
        </firebaseContex.Provider>
    );
};

export default FirebaseState;
