import React, { useState } from "react";
import "./PostCard.css"; // Importa los estilos CSS para las tarjetas de publicaciones.
import { FiHeart, FiSend, FiSmile } from "react-icons/fi"; // Importa iconos de corazón, enviar y sonrisa.
import { FaRegComment } from "react-icons/fa"; // Importa el icono de comentario.
import { updateDoc, arrayUnion, doc, arrayRemove } from "firebase/firestore"; // Importa funciones de Firestore para actualizar documentos.
import { db, auth } from "../../config/FirebaseConfig"; // Importa la base de datos y autenticación de Firebase.
import { Link } from "react-router-dom"; // Importa el componente Link para la navegación.

// Componente PostCard, muestra cada publicación individualmente.
const PostCard = ({ post, postId, setAlertMessage }) => {
    // Estados para manejar los likes, comentarios y un clic.
    const [likesCount, setLikesCount] = useState(post.likes);
    const [comments, setComments] = useState("");
    const [isClick, setIsClick] = useState(false);

    // Verifica si el usuario actual ha dado like a la publicación.
    const isLiked = post.likes.filter(
        (value) => auth.currentUser.displayName === value.username
    );

    // Manejador de likes. Si ya se dio like, lo remueve, y viceversa.
    const handleLikes = async () => {
        setIsClick(true);
        try {
            if (isLiked.length !== 0) { // Si ya se dio like, remueve el like.
                setLikesCount(likesCount - 1);
                await updateDoc(doc(db, "posts", postId), {
                    likes: arrayRemove({
                        username: auth.currentUser.displayName,
                    }),
                });
            } else { // Si no se ha dado like, lo añade.
                setLikesCount(likesCount + 1);
                await updateDoc(doc(db, "posts", postId), {
                    likes: arrayUnion({
                        username: auth.currentUser.displayName,
                    }),
                });
            }
        } catch (error) {
            console.log(error);
            setAlertMessage(error.message);
        }

        setTimeout(() => {
            setIsClick(false);
        }, 1000);
    };

    // Manejador para publicar comentarios en la publicación.
    const handlePostComments = async () => {
        try {
            await updateDoc(doc(db, "posts", postId), {
                comments: arrayUnion({
                    username: auth.currentUser.displayName,
                    comment: comments,
                }),
            });
            setComments("");
        } catch (error) {
            console.log(error);
            setAlertMessage(error.message);
            setComments("");
        }
    };

    // Manejador para compartir la publicación.
    const handleShare = async (username, caption) => {
        const shareData = {
            title: "Galeria Toto",
            text: `Un increíble post publicado por ${username} con la descripción ${caption}. Sigue el enlace para verlo`,
            url: document.location.href,
        };
        try {
            await navigator.share(shareData);
        } catch (error) {
            console.log(error);
            setAlertMessage(error.message);
        }
    };

    // Estructura JSX del componente PostCard.
    return (
        <div className="card-container">
            <div className="card-wrapper">
                {/* Cabecera de la tarjeta con el perfil del usuario. */}
                <div className="card-header align-center ">
                    <div className="image-wrapper absolute-center">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                            alt="perfil del usuario"
                        />
                    </div>
                    <Link to={`/profile/${post.username}`}>
                        <div className="profile-username cur-point">{post.username}</div>
                    </Link>
                </div>
                {/* Imagen de la publicación, que se puede dar doble clic para like. */}
                <div
                    className="post-wrapper absolute-center cur-point"
                    onDoubleClick={handleLikes}
                >
                    <img src={post.imageUrl} alt="post" />
                    <div
                        className="large-like-icon"
                        style={{ display: isClick ? "block" : "none" }}
                    >
                        <FiHeart
                            style={{
                                width: "100%",
                                height: "100%",
                                fill: "red",
                                color: "red",
                            }}
                        />
                    </div>
                </div>
                {/* Sección de botones para like, comentario y compartir. */}
                <div className="card-bottom">
                    <div className="post-like-comments-wrapper align-center">
                        {/* Botón de like */}
                        <div className="like-icon absolute-center">
                            <button
                                type="button"
                                title="like"
                                onClick={handleLikes}
                                className="like-btn cur-point"
                            >
                                <FiHeart
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        fill: isLiked.length > 0 && "red",
                                        color: isLiked.length > 0 && "red",
                                    }}
                                />
                            </button>
                        </div>
                        {/* Icono de comentario */}
                        <div className="comments-icon absolute-center">
                            <FaRegComment style={{ width: "100%", height: "100%" }} />
                        </div>
                        {/* Botón de compartir */}
                        <div
                            className="share-icon absolute-center cur-point"
                            onClick={() => handleShare(post.username, post.caption)}
                        >
                            <FiSend style={{ width: "100%", height: "100%" }} />
                        </div>
                    </div>
                    {/* Contador de likes */}
                    <div className="like-count-wrapper ">{post.likes.length} Likes</div>
                    {/* Fecha de la publicación */}
                    <div className="post-date-wrapper">
                        {post.datePostedOn.toDate().toDateString()}
                    </div>
                    {/* Nombre de usuario y descripción */}
                    <div className="username-caption-wrapper align-center ">
                        <div className="profile-username">{post.username}</div>
                        <div className="caption-wrapper">{post.caption}</div>
                    </div>
                    {/* Sección para mostrar comentarios */}
                    {post.comments?.map((data, index) => (
                        <div className="comments-display-section align-center" key={index}>
                            <p className="profile-username">{data.username}</p>
                            <p className="comments-wrapper caption-wrapper">{data.comment}</p>
                        </div>
                    ))}
                </div>
                {/* Área para agregar un nuevo comentario */}
                <div className="post-comments-wrapper align-center">
                    <div className="smile-icon">
                        <FiSmile style={{ width: "100%", height: "100%" }} />
                    </div>
                    <input
                        type="text"
                        className="comments-input"
                        placeholder="Agregar un comentario"
                        onChange={(e) => setComments(e.target.value)}
                        value={comments ?? ""}
                        min={1}
                        maxLength={50}
                    />
                    {/* Botón para publicar el comentario */}
                    <button
                        disabled={comments.length <= 0}
                        onClick={handlePostComments}
                        type="button"
                        className="comments-post-btn cur-point"
                        style={{ opacity: comments.length <= 0 && "0.5" }}
                    >
                        Publicar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
