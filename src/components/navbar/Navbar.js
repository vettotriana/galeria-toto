import React, { useContext, useState } from 'react';
import './Navbar.css'; // Importa los estilos CSS para la barra de navegaci�n.
import { MdHomeFilled, MdOutlineExplore, MdOutlineAddBox, MdOutlineMenu } from 'react-icons/md'; // Importa iconos de Material Design.
import { GrSearch } from 'react-icons/gr'; // Importa el icono de b�squeda.
import { NavLink, useNavigate } from 'react-router-dom'; // Importa componentes de React Router para la navegaci�n.
import firebaseContex from '../../context/FirebaseContex'; // Importa el contexto de Firebase.
import { auth } from '../../config/FirebaseConfig'; // Importa la configuraci�n de autenticaci�n de Firebase.

const Navbar = () => {
    // Obtiene funciones y estados del contexto de Firebase.
    const { logout, isUpload, setIsUpload, isSearch, setIsSearch } = useContext(firebaseContex);

    // Estado para controlar la visibilidad del men� adicional.
    const [isMenuMore, setIsMenuMore] = useState(false);

    // Hook para navegar entre rutas.
    const navigate = useNavigate();

    // Funci�n para manejar el cierre de sesi�n.
    const handleLogout = async () => {
        navigate('/login'); // Navega a la p�gina de inicio de sesi�n.
        await logout(); // Cierra la sesi�n en Firebase.
    }

    return (
        <div className="navbar-container" style={{ width: isSearch && '80px' }}>
            <div className="navbar-wrapper">
                <div className="logo-wrapper" style={{ textAlign: isSearch && 'center' }}>
                    {/* Muestra el logo o el texto dependiendo del estado de b�squeda. */}
                    {isSearch ? (
                        <img
                            src={'/images/toto-logo.png'}
                            alt="logo de instagram"
                            className='photogram-logo'
                            style={{ width: isSearch && '40px', height: isSearch && '40px' }}
                        />
                    ) : (
                        <div className="photogram-logo" style={{ width: isSearch && '40px', height: isSearch && '40px' }}>
                            Galeria Toto
                        </div>
                    )}
                </div>
                <div className="nav-menu-wrapper">
                    {/* Enlaces de navegaci�n con iconos y t�tulos. */}
                    <div className='home-menu-wrapper  menu-wrapper'>
                        <NavLink to='/' className={({ isActive }) => isActive ? 'active-link align-center' : 'align-center'}>
                            <div className="icon absolute-center">
                                <MdHomeFilled style={{ width: '100%', height: '100%' }} />
                            </div>
                            <div className={`menu-title ${isSearch && 'hide-content'}`}>
                                Inicio
                            </div>
                        </NavLink>
                    </div>

                    {/* Bot�n para activar/desactivar la b�squeda. */}
                    <div className='search-menu-wrapper menu-wrapper'>
                        <button
                            type='button'
                            className='create-btn cur-point'
                            title='buscar usuario'
                            onClick={() => setIsSearch(!isSearch)}
                        >
                            <div className="icon absolute-center">
                                <GrSearch style={{ width: '100%', height: '100%' }} />
                            </div>
                            <div className={`menu-title ${isSearch && 'hide-content'}`}>
                                Buscar
                            </div>
                        </button>
                    </div>

                    {/* Enlace a la p�gina de exploraci�n. */}
                    <div className='explore-menu-wrapper menu-wrapper'>
                        <NavLink to='/explore' className={({ isActive }) => isActive ? 'active-link align-center' : 'align-center'}>
                            <div className="icon absolute-center">
                                <MdOutlineExplore style={{ width: '100%', height: '100%' }} />
                            </div>
                            <div className={`menu-title ${isSearch && 'hide-content'}`}>
                                Explorar
                            </div>
                        </NavLink>
                    </div>

                    {/* Bot�n para activar la subida de publicaciones. */}
                    <div className='post-menu-wrapper menu-wrapper'>
                        <button
                            type='button'
                            className='create-btn cur-point'
                            title='crear publicaci�n'
                            onClick={() => setIsUpload(!isUpload)}
                        >
                            <div className="icon absolute-center">
                                <MdOutlineAddBox style={{ width: '100%', height: '100%' }} />
                            </div>
                            <div className={`menu-title ${isSearch && 'hide-content'}`}>
                                Crear
                            </div>
                        </button>
                    </div>

                    {/* Enlace a la p�gina de perfil del usuario. */}
                    <div className="profile-menu-wrapper menu-wrapper">
                        <NavLink to={`/profile/${auth.currentUser?.displayName}`} className={({ isActive }) => isActive ? 'active-link align-center' : 'align-center'}>
                            <div className="user-image-wrapper absolute-center icon">
                                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="perfil de usuario" />
                            </div>
                            <div className={`menu-title ${isSearch && 'hide-content'}`}>
                                Perfil
                            </div>
                        </NavLink>
                    </div>

                    {/* Bot�n para mostrar m�s opciones. */}
                    <div className="more-menu-wrapper menu-wrapper">
                        <button
                            type='button'
                            title='m�s opciones'
                            className='more-menue-btn create-btn cur-point'
                            onClick={() => setIsMenuMore(!isMenuMore)}
                        >
                            <div className=" icon">
                                <MdOutlineMenu style={{ width: '100%', height: '100%' }} />
                            </div>
                            <div className={`menu-title ${isSearch && 'hide-content'}`}>
                                Mas
                            </div>
                        </button>
                        <div className="more-menu-options-wrapper" style={{ display: isMenuMore ? 'flex' : 'none' }}>
                            <div className="logut-wrapper">
                                <button
                                    type='button'
                                    title='cerrar sesi�n'
                                    className='logout-btn cur-point'
                                    onClick={handleLogout}
                                >Salir</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;
