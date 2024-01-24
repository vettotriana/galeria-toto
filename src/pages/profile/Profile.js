import React, { useContext, useEffect, useState } from 'react';
import { FaComment } from 'react-icons/fa'; // Importa el ícono de comentario.
import { FiHeart } from 'react-icons/fi'; // Importa el ícono de corazón.
import ImageUpload from '../../components/imageUpload/ImageUpload'; // Importa el componente para subir imágenes.
import Navbar from '../../components/navbar/Navbar'; // Importa el componente de la barra de navegación.
import firebaseContex from '../../context/FirebaseContex'; // Importa el contexto de Firebase.
import ExploreCardSkeleton from '../explore/ExploreCardSkeleton'; // Importa el esqueleto de carga para las tarjetas de exploración.
import './Profile.css'; // Importa los estilos CSS para la página de perfil.
import '../explore/Explore.css'; // Importa los estilos CSS de la página de exploración.
import ProfileSkeleton from './ProfileSkeleton'; // Importa el esqueleto de carga para el perfil.
import { arrayRemove, arrayUnion, collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore'; // Importa funciones de Firestore.
import { auth, db } from '../../config/FirebaseConfig'; // Importa la configuración de Firebase.
import { useParams } from 'react-router-dom'; // Importa el hook para obtener parámetros de la URL.
import SearchBox from '../../components/searchBox/SearchBox'; // Importa el componente de búsqueda.
import Loading from '../../components/loading/Loading'; // Importa el componente de carga.

// Componente Profile para la página de perfil de usuario.
const Profile = () => {
    const { allUsers, loading, setLoading } = useContext(firebaseContex); // Utiliza el contexto de Firebase.
    const localUser = JSON.parse(localStorage.getItem('authUser')); // Obtiene el usuario local del almacenamiento.
    const [currentUserPosts, setCurrentUserPosts] = useState([]); // Estado para almacenar las publicaciones del usuario actual.
    const [loadingSpinner, setLoadingSpinner] = useState(false); // Estado para controlar la visualización del spinner de carga.

    // Obtiene el nombre de usuario de los parámetros de la URL.
    const { username } = useParams();

    // Función para obtener las publicaciones del usuario actual.
    const getCurrentUserPosts = () => {
        const postRef = collection(db, "posts");
        const q = query(postRef, where('username', '==', username));
        onSnapshot(q, (querySnapshot) => {
            setCurrentUserPosts(querySnapshot.docs);
            setLoading(false);
        });
    };

    // Obtiene y verifica la información del usuario desde el parámetro.
    const allUsersData = allUsers.map((user) => user.data());
    const currentUserInfo = allUsersData.filter((val) => (val?.username) === (username));

    // Obtiene los datos del usuario local.
    const localUserData = allUsersData.filter((val) => {
        return (localUser?.uid) === (val.userId);
    });

    // Verifica si el nombre de usuario está presente en la lista de seguimiento del usuario local.
    const isFollowing = localUserData.map((data) => data.following)[0]?.filter((val) => val?.username === username);

    // Maneja el seguimiento y la cancelación del seguimiento de un usuario.
    const handleClick = async (username, userId) => {
        setLoadingSpinner(true);
        if (!isFollowing.length) {
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
        } else {
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
        setLoadingSpinner(false);
    };

    // Efecto para obtener las publicaciones del usuario actual.
    useEffect(() => {
        getCurrentUserPosts();
    }, [username]);

  // Estructura JSX del componente Profile.

  return (
    <div className='profile-page-section'>
      <div className="top-photogram-logo">
        <div className="photogram-logo">
          Galeria Toto
        </div>
      </div>
      <Navbar />
      <ImageUpload />
      <SearchBox />


      <div className="profile-page-container">
        {
          loading ? <ProfileSkeleton />
            :
            currentUserInfo.map((currentUser) =>
              <div className="profile-datails-section" key={currentUser.userId}>
                <div className="profile-image-details-wrapper absolute-center ">
                  <div className="profile-image-wrapper">
                    <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user-profile" />
                  </div>

                  <div className="profile-details-wrapper" >
                    <div className="profile-username-follow-wrapper ">
                      <div className="profile-username">
                        {currentUser?.username}
                      </div>
                      {(localUserData[0].username !== currentUser.username) &&
                        <div className="profile-follow-unfollow-btn-wrapper">
                          <button
                            type='button'
                            className='profile-follow-unfollow-btn cur-point'
                            onClick={() => handleClick(currentUser.username, currentUser.userId)}
                            style={{ background: (isFollowing.length) ? '#efefef' : '', color: (isFollowing.length) ? 'black' : '' }}
                          >
                            {!isFollowing.length ? 'Follow' : 'Unfollow'}
                          </button>
                          {loadingSpinner && <Loading />}
                        </div>

                      }
                    </div>
                    <div className="posts-followers-details-wrapper absolute-center">
                      <div className="total-posts-wrapper total-wrapper absolute-center">
                        <span className='font-w-500 total-number'>{currentUserPosts.length}</span>
                        Post
                      </div>
                      <div className="total-followers-wrapper total-wrapper absolute-center">
                        <span className='font-w-500 total-number'>{currentUser.follower?.length}</span>
                        followers
                      </div>
                      <div className="total-following-wrapper total-wrapper absolute-center">
                        <span className='font-w-500 total-number'>{currentUser.following?.length}</span>
                        following
                      </div>
                    </div>
                    <div className="profile-fullname-wrapper font-w-500">
                      {currentUser.fullName}
                    </div>
                  </div>
                </div>

                <div className="mobile-screen">
                  <div className="profile-fullname-wrapper font-w-500">
                    {currentUser.fullName}
                  </div>
                </div>
              </div>
            )

        }
        <div className="posts-list-section">

          <div className="posts-list-title">
            Posts
          </div>
          <div className="posts-list-container">
            {
              loading ? <ExploreCardSkeleton number={3} />
                :
                currentUserPosts.map((post) =>
                  <div className="post-list-wrapper explore-post-container cur-point" key={post.id} >
                    <div className="explore-post-image">
                      <img src={post.data().imageUrl} alt="post" />
                    </div>
                    <div className="like-comments-wrapper ">
                      <div className="like-wrapper align-center">
                        <div className="like-icon absolute-center">
                          <FiHeart style={{ width: '85%', height: '85%', fill: 'white' }} />
                        </div>
                        <div className="like-counts">
                          {post.data().likes.length}
                        </div>
                      </div>
                      <div className="comments-wrapper align-center">
                        <div className="comments-icon absolute-center ">
                          <FaComment style={{ width: '85%', height: '85%', fill: 'white' }} />
                        </div>
                        <div className="commets-counts">
                          {post.data().comments.length}
                        </div>
                      </div>
                    </div>
                  </div>

                )}
            {!currentUserPosts.length && <p> No hay fotos disponibles</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile