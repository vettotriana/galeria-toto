import { sendEmailVerification } from 'firebase/auth'; // Importa funci�n de Firebase para enviar verificaci�n de email.
import React, { useContext, useEffect, useState } from 'react'; // Importa las funciones necesarias de React.
import { FaFacebookSquare } from 'react-icons/fa'; // Importa el icono de Facebook.
import { Link, useNavigate } from 'react-router-dom'; // Importa las funciones para navegaci�n y enlaces de React Router.
import Footer from '../../components/footer/Footer'; // Importa el componente Footer.
import Loading from '../../components/loading/Loading'; // Importa el componente de carga.
import { auth } from '../../config/FirebaseConfig'; // Importa la configuraci�n de autenticaci�n de Firebase.
import firebaseContex from '../../context/FirebaseContex'; // Importa el contexto de Firebase.
import './Login.css'; // Importa los estilos CSS para la p�gina de inicio de sesi�n.
import '../signup/Signup.css'; // Importa los estilos CSS para la p�gina de registro.

// Componente Login para la p�gina de inicio de sesi�n.
const Login = () => {
    const { login, facebookLogin } = useContext(firebaseContex); // Utiliza el contexto de Firebase para obtener funciones de inicio de sesi�n.
    const [email, setEmail] = useState(''); // Estado para el correo electr�nico ingresado por el usuario.
    const [password, setPassword] = useState(''); // Estado para la contrase�a ingresada por el usuario.
    const [loading, setLoading] = useState(false); // Estado para indicar si se est� cargando algo en el componente.
    const [isEmailSend, setIsEmailSend] = useState(false); // Estado para indicar si se ha enviado un correo de verificaci�n.
    const localUser = JSON.parse(localStorage.getItem('authUser')); // Obtiene el usuario del almacenamiento local, si existe.
    const [errorMessage, setErrorMessage] = useState(''); // Estado para almacenar y mostrar mensajes de error.
    const navigate = useNavigate(); // Hook para navegar entre rutas.

    const invalid = (password.length < 6) || email === ''; // Verifica si los datos del formulario son inv�lidos.

    // Funci�n para manejar el env�o del formulario de inicio de sesi�n.
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const loginUser = await login(email, password);
            if (auth.currentUser.emailVerified) {
                localStorage.setItem('authUser', JSON.stringify(loginUser.user));
                setLoading(false);
                navigate('/');
            } else {
                setErrorMessage('El correo no ha sido verificado.');
                await sendEmailVerification(auth.currentUser);
                setLoading(false);
                setIsEmailSend(true);
                let interval = setInterval(async () => {
                    await auth.currentUser.reload();
                    if (auth.currentUser.emailVerified) {
                        clearInterval(interval);
                        localStorage.setItem('authUser', JSON.stringify(loginUser.user));
                        navigate('/');
                        setIsEmailSend(false);
                    }
                }, 2000);
            }
        } catch (error) {
            e.target.reset();
            setLoading(false);
            setErrorMessage(error.message.replace('Firebase:', ''));
            setTimeout(() => {
                setErrorMessage('');
            }, 5000);
        }
    };

    // Funci�n para manejar el inicio de sesi�n con Facebook.
    const handleFacebookLogin = async () => {
        try {
            const facebookLoginUser = await facebookLogin();
            localStorage.setItem('authUser', JSON.stringify(facebookLoginUser.user));
            navigate('/');
        } catch (error) {
            console.log(error);
            setErrorMessage(error.message.replace('Firebase:', ''));
            setTimeout(() => {
                setErrorMessage('');
            }, 5000);
        }
    };

    // Efecto para redirigir a la p�gina principal si el usuario ya est� autenticado.
    useEffect(() => {
        if (localUser) {
            navigate('/');
        }
    }, [localUser, navigate]);

    // Estructura JSX del componente Login.
    return (
        <div className='login-container'>
            <div className="login-poster">
                <img src="/images/iphone.png" alt="iphone-poster" className='login-poster-image' />
            </div>
            <div className="login-wrapper">
                <div className="login-box">
                    <div className="logo-wrapper">
                        <div className="photogram-logo">Galeria Toto</div>
                    </div>
                    {!isEmailSend ?
                        <div className="login-form-wrapper">
                            <form className='login-form' onSubmit={handleSubmit}>
                                <div className="input-label">
                                    <input type="email" placeholder='Direccion Email' aria-label='Ingresa tu direccion email' aria-required='true' autoComplete='off' name='email' onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="input-label">
                                    <input type="password" placeholder='Password' aria-label='Ingresa el password' aria-required='true' autoComplete='off' name='password' onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="button-wrapper ">
                                    <button disabled={invalid} type='submit' className='login-button cur-point' style={{ opacity: (invalid || loading) && '0.5' }}>Log In</button>
                                    {loading && <Loading />}
                                </div>
                            </form>
                            {errorMessage && <p className='errorMessage'>{errorMessage}</p>}
                        </div>
                        :
                        <div className="signup-confirm-email-wrapper">
                            <div className="confirm-email-image-wrapper">
                                <img src="/images/confirm-email.svg" alt="confirm-email" className='confirm-email-image' />
                            </div>
                            <div className='confirm-email-message'>
                                Su correo electr�nico a�n no ha sido verificado, as� que primero verifique su correo electr�nico. Enlace de verificaci�n enviado a su correo electr�nico (revise la bandeja de entrada o la carpeta de spam).
                            </div>
                        </div>
                    }
                    <div className='seprator'>O</div>
                    <div className="facebook-login-wrapper">
                        <button type='button' onClick={handleFacebookLogin} className='facebook-login-btn login-button cur-point align-center'>
                            <span className="facebook-icon"><FaFacebookSquare style={{ width: '100%', height: '100%' }} /></span>
                            Logeo con facebook
                        </button>
                    </div>
                </div>
                <div className="redirect-box login-box">
                    <div className="redirect-text">
                        <p>No tienes una cuenta? <Link to='/signup' className='cur-point'>Inscribirse</Link></p>
                    </div>
                </div>
                <div className="guest-login-info-wrapper login-box" style={{ display: 'none' }}>
                    <div className="title">Crea una nueva cuenta o inicia sesi�n como invitado</div>
                    <div className="guest-login-credential">
                        <div className="guest-email">
                            <p>Email: invitado@galeria-toto.com</p>
                        </div>
                        <div className="guest-password">
                            <p>Password: galeriatoto@1234</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Login;
