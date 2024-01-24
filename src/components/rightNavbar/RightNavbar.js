import React, { useContext } from "react";
import Footer from "../footer/Footer"; // Importa el componente Footer.
import "./RightNavbar.css"; // Importa los estilos CSS para la barra lateral derecha.
import SuggestionList from "./suggestionList/SuggestionList"; // Importa el componente SuggestionList.
import firebaseContex from "../../context/FirebaseContex"; // Importa el contexto de Firebase.

// Componente RightNavbar para mostrar la barra lateral derecha en la interfaz de usuario.
const RightNavbar = ({ currentUserInfo }) => {
    const { suggestedUsers } = useContext(firebaseContex); // Obtiene los usuarios sugeridos del contexto.

    return (
        <div className="rightNavbar-section">
            {/* Contenedor de perfil del usuario y sugerencias */}
            <div className="userprofile-suggestion-wrapper">
                {/* Perfil del usuario actual */}
                <div className="userprofile-wrapper">
                    <div className="userprofile-image-wrapper">
                        {/* Imagen del perfil del usuario */}
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            alt="perfil del usuario"
                        />
                    </div>
                    {/* Información del usuario actual */}
                    {currentUserInfo.map((currentUser) => (
                        <div className="username-fullname-wrapper" key={currentUser.id}>
                            <div className="username-wrapper">
                                {currentUser.data().username}
                            </div>
                            <div className="fullname-wrapper">
                                {currentUser.data().fullName}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Lista de sugerencias para el usuario */}
                <div className="suggestion-wrapper">
                    {/* Título de la sección de sugerencias */}
                    <div className="suggestion-title">Sugerencias para ti</div>
                    <div className="suggestion-user-list">
                        {/* Lista de usuarios sugeridos */}
                        {suggestedUsers.map((users) => (
                            <SuggestionList
                                users={users.data()}
                                key={users.id}
                                usersId={users.id}
                            />
                        ))}
                    </div>
                    {/* Pie de página */}
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default RightNavbar;
