import React, { useContext, useState } from 'react'
import './Signup.css'
import '../login/Login.css'
import { Link, useNavigate } from 'react-router-dom'
import firebaseContex from '../../context/FirebaseContex'
import { db, auth } from '../../config/FirebaseConfig'
import { doc, setDoc } from 'firebase/firestore'
import usernameChecker from './UsernameCheker'
import { sendEmailVerification, updateProfile } from 'firebase/auth'
import Loading from '../../components/loading/Loading'
import Footer from '../../components/footer/Footer'


const Signup = () => {
  const { signup } = useContext(firebaseContex)
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEmailSend, setIsEmailSend] = useState(false);

  const navigate = useNavigate();

  const invalid = (password.length < 6) || email === '' || fullName === '' || username === '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const usernameList = await usernameChecker(username)
    if (!usernameList.length) {
      try {
        const createUser = await signup(email, password);
        await updateProfile(auth.currentUser, {
          displayName: username.toLowerCase().trim()
        });

        await sendEmailVerification(createUser.user)

        setLoading(false)
        setIsEmailSend(true)

        // wait until email verify
        let interval = setInterval(async () => {
          if (auth.currentUser.emailVerified) {
            clearInterval(interval);

            localStorage.setItem('authUser', JSON.stringify(createUser.user))

            // add userinfo to firebase database
            const userRef = doc(db, 'userinfo', createUser.user.uid)
            await setDoc(userRef,
              {
                userId: createUser.user.uid,
                email: email.toLowerCase(),
                fullName: fullName.trim(),
                username: username.toLowerCase().trim(),
                follower: [],
                following: [],
                authProvider: 'Email and password',
                dateCreated: new Date()
              }
            )
            navigate('/')
            setIsEmailSend(false)

          }
          await auth.currentUser.reload()
        }, 2000);

      } catch (error) {
        console.log(error)
        e.target.reset();
        setLoading(false)
        setErrorMessage(error.message.replace('Firebase:', ''));
        setTimeout(() => {
          setErrorMessage('')
        }, 5000);

      }
    }
    else {
      setErrorMessage("Username already taken")
      setLoading(false);
      setTimeout(() => {
        setErrorMessage('')
      }, 3000);

    }
  }


  return (
    <div className='login-container'>
      <div className="login-wrapper">
        <div className="login-box">
          <div className="logo-wrapper">
            <div className="photogram-logo">
              Galeria Toto
            </div>
          </div>

          {!isEmailSend ?

            <div className="login-form-wrapper">
              <form className='login-form' onSubmit={handleSubmit} >
                <div className="input-label">
                  <input
                    type="email"
                    placeholder='Direccion Email'
                    aria-label='Ingresa tu direccion Email'
                    aria-required='true'
                    autoComplete='off'
                    name='email'
                    onChange={(e) => setEmail(e.target.value)}

                  />
                </div>
                <div className="input-label">
                  <input
                    type="text"
                    placeholder='Nombre Completo'
                    aria-label='Ingresa tu nombre Completo'
                    aria-required='true'
                    autoComplete='off'
                    name='fullName'
                    onChange={(e) => setFullName(e.target.value)}

                  />
                </div>
                <div className="input-label">
                  <input
                    type="text"
                    placeholder='Usuario'
                    aria-label='Ingresa tu usuarie'
                    aria-required='true'
                    autoComplete='off'
                    name='username'
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={(e) => e.code === 'Space' && e.preventDefault()}

                  />
                </div>
                <div className="input-label">
                  <input
                    type="password"
                    placeholder='Password'
                    aria-label='Infresa tu password'
                    aria-required='true'
                    autoComplete='off'
                    name='password'
                    onChange={(e) => setPassword(e.target.value)}

                  />
                </div>

                <div className="button-wrapper ">
                  <button
                    disabled={invalid}
                    type='Enviar'
                    className='login-button cur-point'
                    style={{ opacity: (invalid || loading) && '0.5' }}
                  >Sign Up
                  </button>
                  {loading && <Loading />}
                </div>

              </form>
              {errorMessage && <p className='errorMessage'>{errorMessage}</p>}
            </div>
            :
            // email send confirmation
            <div className="signup-confirm-email-wrapper">
              <div className="confirm-email-image-wrapper">
                <img
                  src="/images/confirm-email.svg"
                  alt="confirm-email"
                  className='confirm-email-image'
                />
              </div>
              <div className='confirm-email-message'>
                              Enlace de verificación enviado a su correo electrónico (revise la bandeja de entrada o la carpeta de spam).
                              Primero verifique el correo electrónico.
              </div>

            </div>
          }


        </div>
        <div className="redirect-box login-box">
          <div className="redirect-text">
            <p>
              Tienes una cuenta? <Link to='/login' className='cur-point'>
                Logearse</Link>
            </p>
          </div>

        </div>
      </div>
      <Footer />
    </div>

  )
}

export default Signup