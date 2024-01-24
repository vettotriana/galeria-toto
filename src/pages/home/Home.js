import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa el hook para la navegación.
import ImageUpload from "../../components/imageUpload/ImageUpload"; // Importa el componente de carga de imágenes.
import Navbar from "../../components/navbar/Navbar"; // Importa el componente de la barra de navegación.
import PostCard from "../../components/postCard/PostCard"; // Importa el componente de la tarjeta de publicación.
import PostCardSkeleton from "../../components/postCard/PostCardSkeleton"; // Importa el esqueleto de carga para las tarjetas de publicación.
import Story from "../../components/stories/Story"; // Importa el componente de historias.
import firebaseContex from "../../context/FirebaseContex"; // Importa el contexto de Firebase.
import "./Home.css"; // Importa los estilos CSS para la página de inicio.
import { RxCross2 } from "react-icons/rx"; // Importa el icono de cruz (cerrar).
import UserInfoModel from "../../components/userInfoModel/UserInfoModel"; // Importa el componente de modelo de información del usuario.
import RightNavbar from "../../components/rightNavbar/RightNavbar"; // Importa el componente de la barra lateral derecha.
import SearchBox from "../../components/searchBox/SearchBox"; // Importa el componente de búsqueda.
import LoadingCircle from "../../components/loading/LoadingCircle"; // Importa el indicador de carga circular.
import useInfiniteScroll from "../../hooks/useInfiniteScroll"; // Importa el hook de desplazamiento infinito.

// Componente Home para la página de inicio.
const Home = () => {
    const { posts, allUsers, loading, postLimit, setPostLimit, postCount } =
        useContext(firebaseContex); // Obtiene los valores del contexto Firebase.
    const navigate = useNavigate(); // Hook para manejar la navegación.
    const [alertMessage, setAlertMessage] = useState(""); // Estado para los mensajes de alerta.

    const localUser = JSON.parse(localStorage.getItem("authUser")); // Obtiene el usuario actual del almacenamiento local.

    // Efecto para redirigir al login si no hay usuario autenticado.
    useEffect(() => {
        if (localUser === null) {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [localUser]);

    // Filtra la información del usuario actual.
    const currentUserInfo = allUsers.filter((val) => {
        return localUser?.uid === val.id;
    });

    // Hook de desplazamiento infinito.
    const infiniteScroll = useInfiniteScroll();

    // Efecto para agregar y remover el evento de desplazamiento.
    useEffect(() => {
        const handleScroll = () =>
            infiniteScroll({
                postLimit,
                postCount,
                setPostLimit,
                increaseLimitBy: 10,
            });

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [postLimit, postCount, infiniteScroll, setPostLimit]);

    // Estructura JSX de la página de inicio.
    return (
        <div className="home-page-container">
            <div className="top-photogram-logo">
                <div className="photogram-logo">Galeria Toto</div>
            </div>
            <Navbar />
            <div className="story-post-wrapper">
                <Story />
                <div className="post-conatiner">
                    {loading ? (
                        <PostCardSkeleton />
                    ) : (
                        posts.map((post) => (
                            <PostCard
                                key={post.id}
                                post={post.data()}
                                postId={post.id}
                                setAlertMessage={setAlertMessage}
                            />
                        ))
                    )}
                </div>

                {postLimit <= postCount ? <LoadingCircle /> : null}
            </div>

            <ImageUpload />
            <SearchBox />

            <RightNavbar currentUserInfo={currentUserInfo} />

            <div className="alert-box" style={{ display: !alertMessage && "none" }}>
                <div className="alert-message-wrapper">{alertMessage}</div>
                <div
                    className="alert-cancle-icon align-center cur-point"
                    onClick={() => setAlertMessage("")}
                >
                    <RxCross2 style={{ width: "100%", height: "100%" }} />
                </div>
            </div>

            {loading ? "" : !currentUserInfo.length && <UserInfoModel />}
        </div>
    );
};

export default Home;
