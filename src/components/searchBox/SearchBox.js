import React, { useContext, useState } from 'react';
import firebaseContex from '../../context/FirebaseContex'; // Importa el contexto de Firebase.
import "./SearchBox.css"; // Importa los estilos CSS para el cuadro de b�squeda.
import '../rightNavbar/RightNavbar.css'; // Importa estilos adicionales.
import { RxCross2 } from 'react-icons/rx'; // Importa el icono de cruz (cerrar).
import { useNavigate } from 'react-router-dom'; // Importa el hook de navegaci�n.

// Componente SearchBox para realizar b�squedas de usuarios.
const SearchBox = () => {
    const { isSearch, setIsSearch, allUsers } = useContext(firebaseContex); // Obtiene valores del contexto Firebase.
    const [searchQuery, setSearchQuery] = useState(''); // Estado para almacenar la consulta de b�squeda.
    const navigate = useNavigate(); // Hook para manejar la navegaci�n.

    // Filtra los usuarios bas�ndose en la consulta de b�squeda.
    const filterUsername = allUsers.map((user) => user.data()).filter((val) => (val?.username)?.includes(searchQuery.toLowerCase()));

    // Funci�n para manejar la redirecci�n al perfil del usuario.
    const handleRedirect = (username) => {
        navigate(`/profile/${username}`);
        setIsSearch(false);
        setSearchQuery('');
    }

    // Estructura JSX del componente SearchBox.
    return (
        <div className='search-box-container' style={{ transform: isSearch ? 'translateX(0px)' : '' }}>
            <div className="search-box-wrapper">
                {/* T�tulo de la secci�n de b�squeda */}
                <div className="search-title">
                    Buscar usuario
                </div>
                {/* Bot�n para cerrar el cuadro de b�squeda */}
                <button
                    type='button'
                    title='bot�n de cerrar'
                    className='cancel-btn cur-point'
                    onClick={() => setIsSearch(false)}
                >
                    <RxCross2 style={{ height: '100%', width: '100%' }} />
                </button>
                {/* Campo de entrada para la b�squeda */}
                <div className="search-input">
                    <input
                        type="text"
                        placeholder='Buscar usuario por nombre de usuario'
                        aria-label='Buscar usuario por nombre de usuario'
                        aria-required='true'
                        autoComplete='off'
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                    />
                    {/* Bot�n para limpiar el campo de b�squeda */}
                    <button
                        type='button'
                        title='bot�n de limpiar'
                        className='clear-btn cancel-btn cur-point'
                        onClick={() => setSearchQuery('')}
                    >
                        <RxCross2 style={{ height: '100%', width: '100%' }} />
                    </button>
                </div>
                {/* Secci�n de resultados de b�squeda */}
                <div className="line-seperator"></div>
                <div className="search-results-wrapper">
                    {/* T�tulo de la secci�n de resultados */}
                    <div className="result-title search-title">
                        Resultados
                    </div>
                    <div className="search-results">
                        {/* Lista de resultados de b�squeda */}
                        {searchQuery &&
                            filterUsername.map((users) =>
                                <div className="search-userprofile-follow-wrapper cur-point" key={users.userId} onClick={() => handleRedirect(users.username)}>
                                    <div className="userprofile-wrapper">
                                        <div className="userprofile-image-wrapper">
                                            <img
                                                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                                alt="perfil del usuario"
                                            />
                                        </div>
                                        <div className="username-fullname-wrapper">
                                            <div className="username-wrapper">
                                                {users.username}
                                            </div>
                                            <div className="fullname-wrapper">
                                                {users.fullName}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        {/* Mensaje cuando no se encuentran usuarios */}
                        {!filterUsername.length && <div>No se encontr� usuario</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchBox;
