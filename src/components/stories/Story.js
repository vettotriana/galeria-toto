import React, { useContext } from 'react'
import './Story.css'; // Importa los estilos CSS para la sección de historias.
import { FaUserAlt } from 'react-icons/fa'; // Importa el icono de usuario.
import firebaseContex from '../../context/FirebaseContex'; // Importa el contexto de Firebase.
import StorySkeleton from './StorySkeleton'; // Importa el componente esqueleto para historias.

// Componente Story para mostrar las historias de los usuarios.
const Story = () => {
    // Obtiene los usuarios y el estado de carga del contexto Firebase.
    const { allUsers, loading } = useContext(firebaseContex);

    return (
        <div className='story-container align-center'>
            {/* Muestra el esqueleto de carga si los datos aún se están cargando. */}
            {loading ? <StorySkeleton />
                :
                // Muestra las historias de todos los usuarios cuando los datos están disponibles.
                allUsers.map((user, index) =>
                    <div className="story-wrapper" key={index}>
                        {/* Icono de perfil del usuario en la historia. */}
                        <div className="story-profile-image">
                            <FaUserAlt style={{ width: '100%', height: '100%', fill: 'white' }} />
                        </div>
                        {/* Nombre de usuario asociado a la historia. */}
                        <div className="username-wrapper">
                            {user.data().username}
                        </div>
                    </div>
                )}
        </div>
    )
}

export default Story;
