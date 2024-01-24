import React, { useContext, useEffect } from "react";
import { FaComment } from "react-icons/fa"; // Importa el icono de comentario.
import { FiHeart } from "react-icons/fi"; // Importa el icono de corazón.
import { useNavigate } from "react-router-dom"; // Importa el hook de navegación.
import ImageUpload from "../../components/imageUpload/ImageUpload"; // Importa el componente de carga de imágenes.
import Navbar from "../../components/navbar/Navbar"; // Importa el componente de la barra de navegación.
import SearchBox from "../../components/searchBox/SearchBox"; // Importa el componente de búsqueda.
import firebaseContex from "../../context/FirebaseContex"; // Importa el contexto de Firebase.
import "./Explore.css"; // Importa los estilos CSS para la página de exploración.
import ExploreCardSkeleton from "./ExploreCardSkeleton"; // Importa el esqueleto de carga para las tarjetas de exploración.
import LoadingCircle from "../../components/loading/LoadingCircle"; // Importa el indicador de carga circular.
import useInfiniteScroll from "../../hooks/useInfiniteScroll"; // Importa el hook de desplazamiento infinito.

// Componente Explore para la página de exploración.
const Explore = () => {
    const { posts, loading, postCount, postLimit, setPostLimit } =
        useContext(firebaseContex); // Obtiene los valores del contexto Firebase.
    const navigate = useNavigate(); // Hook para manejar la navegación.
    const localUser = JSON.parse(localStorage.getItem("authUser")); // Obtiene el usuario actual del almacenamiento local.

    // Efecto para redirigir al login si no hay usuario autenticado.
    useEffect(() => {
        if (localUser === null) {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [localUser]);

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

    // Estructura JSX de la página de exploración.
    return (
        <div className="explore-page-container">
            <div className="top-photogram-logo">
                <div className="photogram-logo">Okv Photogram</div>
            </div>
            <Navbar />
            <ImageUpload />
            <SearchBox />

            {/* Sección de exploración con publicaciones */}
            <div className="explore-section">
                {loading ? (
                    <ExploreCardSkeleton number={6} />
                ) : (
                    <>
                        {posts.map((post) => (
                            <div className="explore-post-container cur-point" key={post.id}>
                                <div className="explore-post-image">
                                    <img src={post.data().imageUrl} alt="post" />
                                </div>
                                <div className="like-comments-wrapper ">
                                    {/* Contenedores de likes y comentarios */}
                                    <div className="like-wrapper align-center">
                                        <div className="like-icon absolute-center">
                                            <FiHeart
                                                style={{ width: "85%", height: "85%", fill: "white" }}
                                            />
                                        </div>
                                        <div className="like-counts">
                                            {post.data().likes.length}
                                        </div>
                                    </div>
                                    <div className="comments-wrapper align-center">
                                        <div className="comments-icon absolute-center ">
                                            <FaComment
                                                style={{ width: "85%", height: "85%", fill: "white" }}
                                            />
                                        </div>
                                        <div className="commets-counts">
                                            {post.data().comments.length}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
            {/* Indicador de carga circular si aún hay más publicaciones por cargar */}
            {postLimit <= postCount ? <LoadingCircle /> : null}
        </div>
    );
};

export default Explore;
