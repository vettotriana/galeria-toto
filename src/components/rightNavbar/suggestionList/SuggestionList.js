import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { auth, db } from '../../../config/FirebaseConfig'; // Importa autenticación y base de datos de Firebase.
import Loading from '../../loading/Loading'; // Importa el componente de carga.

import './SuggestionList.css'; // Importa los estilos CSS para la lista de sugerencias.

// Componente SuggestionList para mostrar y manejar la lista de sugerencias de usuarios.
const SuggestionList = ({ users, usersId }) => {
    const [loading, setLoading] = useState(false); // Estado para controlar la visualización del indicador de carga.

    // Verifica si el usuario actual ya sigue al usuario en la lista de sugerencias.
    const isFollower = (users.follower)?.filter((value) => (value?.username) === (auth.currentUser.displayName));

    // Función para manejar el click en los botones de seguir/dejar de seguir.
    const handleClick = async (username, userId) => {
        setLoading(true); // Activa el indicador de carga.
        if (!isFollower.length) {
            // Si no es seguidor, agrega al usuario actual como seguidor.
            await updateDoc(doc(db, 'userinfo', auth.currentUser.uid), {
                following: arrayUnion({
                    username,
                })
            });
            await updateDoc(doc(db, 'userinfo', userId), {
                follower: arrayUnion({
                    username: auth.currentUser.displayName,
                })
            });
        }
        else {
            // Si ya es seguidor, quita al usuario actual de los seguidores.
            await updateDoc(doc(db, 'userinfo', auth.currentUser.uid), {
                following: arrayRemove({
                    username,
                })
            });
            await updateDoc(doc(db, 'userinfo', userId), {
                follower: arrayRemove({
                    username: auth.currentUser.displayName,
                })
            });
        }
        setLoading(false); // Desactiva el indicador de carga.
    }

    // Estructura JSX del componente SuggestionList.
    return (
        <div className="userprofile-follow-wrapper" >
            <div className="userprofile-wrapper">
                {/* Sección del perfil del usuario sugerido. */}
                <div className="userprofile-image-wrapper">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        alt="perfil del usuario"
                    />
                </div>
                <div className="username-fullname-wrapper">
                    {/* Muestra el nombre de usuario y nombre completo del usuario sugerido. */}
                    <div className="username-wrapper">
                        {users.username}
                    </div>
                    <div className="fullname-wrapper">
                        {users.fullName}
                    </div>
                </div>
            </div>
            <div className="follow-unfollow-btn-wrapper ">
                {/* Botón para seguir o dejar de seguir al usuario. */}
                <button
                    type='button'
                    className='follow-unfollow-btn cur-point'
                    onClick={() => handleClick(users.username, usersId)}
                >
                    {isFollower?.length ? 'Dejar de Seguir' : 'Seguir'}
                </button>
                {/* Muestra el indicador de carga mientras se procesa la acción. */}
                {loading && <Loading />}
            </div>
        </div>
    );
}

export default SuggestionList;
