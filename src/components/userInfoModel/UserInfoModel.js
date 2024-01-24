import React, { useState } from 'react';
import './UserInfoModel.css'; // Importa los estilos CSS para el modelo de información de usuario.
import '../../pages/login/Login.css'; // Importa estilos CSS adicionales.
import { updateProfile } from 'firebase/auth'; // Importa función para actualizar el perfil de Firebase Auth.
import { auth, db } from '../../config/FirebaseConfig'; // Importa la autenticación y base de datos de Firebase.
import usernameChecker from '../../pages/signup/UsernameCheker'; // Importa la función para verificar la disponibilidad del nombre de usuario.
import { doc, setDoc } from 'firebase/firestore'; // Importa funciones de Firestore para manipular documentos.
import Loading from '../loading/Loading'; // Importa el componente de carga.

// Componente UserInfoModel para actualizar el nombre completo y el nombre de usuario del perfil.
const UserInfoModel = () => {
    // Obtiene la información del usuario actual del almacenamiento local.
    const localUser = JSON.parse(localStorage.getItem('authUser'));
    // Estados para almacenar el nombre completo, nombre de usuario, y otros estados.
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState(localUser?.displayName);
    const [isModel, setIsModel] = useState(true);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Verifica si los campos están vacíos.
    const invalid = username === '' || fullName === '';

    // Manejador del clic para actualizar el perfil.
    const handleClick = async () => {
        try {
            setLoading(true); // Activa el indicador de carga.
            const usernameList = await usernameChecker(username); // Verifica la disponibilidad del nombre de usuario.
            if (!usernameList.length) {
                // Si el nombre de usuario está disponible, actualiza el perfil.
                await updateProfile(auth.currentUser, {
                    displayName: username.toLowerCase().trim()
                });

                // Añade la información del usuario a la base de datos de Firebase.
                const userRef = doc(db, 'userinfo', localUser.uid);
                await setDoc(userRef, {
                    userId: localUser.uid,
                    email: localUser.email,
                    fullName: fullName.trim(),
                    username: username.toLowerCase().trim(),
                    follower: [],
                    following: [],
                    authProvider: 'Facebook',
                    dateCreated: new Date()
                });
                setLoading(false);
                setIsModel(false);
            } else {
                // Si el nombre de usuario no está disponible, muestra un error.
                setLoading(false);
                setErrorMessage("Usuario actualmente esta tomado");
                setUsername('');
                setTimeout(() => {
                    setErrorMessage('');
                }, 5000);
            }
        } catch (error) {
            console.log(error);
            setErrorMessage(error.message);
        }
    };

    // Estructura JSX del componente UserInfoModel.
    return (
        <div className="set-username-fullname-model absolute-center" style={{ display: isModel ? 'flex' : 'none' }}>
            <div className="set-username-fullname-wrapper">
                <div className="set-username-fullname-box login-box">
                    <div className="model-title">
                        ¡Actualiza tu nombre completo y nombre de usuario!
                    </div>
                    {/* Campos de entrada para el nombre completo y el nombre de usuario */}
                    <div className="input-label">
                        <input
                            type="text"
                            placeholder='Nombre completo'
                            aria-label='Ingresa tu nombre completo'
                            aria-required='true'
                            autoComplete='off'
                            name='fullName'
                            onChange={(e) => setFullName(e.target.value)}
                            value={fullName}
                        />
                    </div>
                    <div className="input-label">
                        <input
                            type="text"
                            placeholder='Nombre de usuario'
                            aria-label='Ingresa tu nombre de usuario'
                            aria-required='true'
                            autoComplete='off'
                            name='username'
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            onKeyDown={(e) => e.code === 'Space' && e.preventDefault()}
                        />
                    </div>
                    {/* Botón para actualizar la información */}
                    <div className="button-wrapper">
                        <button
                            type='button'
                            className='login-button cur-point'
                            onClick={handleClick}
                            disabled={invalid}
                            style={{ opacity: invalid && 0.5 }}
                        >Actualizar
                        </button>
                        {loading && <Loading />}
                    </div>
                    {/* Mensaje de error, si lo hay */}
                    {errorMessage && <p className='errorMessage'>{errorMessage}</p>}
                </div>
            </div>
        </div>
    );
}

export default UserInfoModel;
