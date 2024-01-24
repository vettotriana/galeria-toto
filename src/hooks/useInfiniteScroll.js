/**
 * Función handleScroll para manejar el desplazamiento infinito en una página.
 *
 * @param {Object} params - Parámetros para la función de manejo de desplazamiento.
 * @param {number} params.postLimit - Límite actual de publicaciones a mostrar.
 * @param {number} params.postCount - Número total de publicaciones disponibles.
 * @param {Function} params.setPostLimit - Función para establecer el nuevo límite de publicaciones.
 * @param {number} params.increaseLimitBy - Cantidad por la que se aumentará el límite de publicaciones.
 */
const handleScroll = ({
    postLimit,
    postCount,
    setPostLimit,
    increaseLimitBy,
}) => {
    // Obtiene propiedades de desplazamiento del documento.
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    // Verifica si el usuario ha llegado cerca del final de la página.
    if (scrollTop + clientHeight >= scrollHeight - 20) {
        // Aumenta el límite de publicaciones si aún no se han cargado todas.
        if (postLimit <= postCount) {
            setPostLimit(postLimit + increaseLimitBy);
        }
    }
};

/**
 * Hook useInfiniteScroll para proporcionar la funcionalidad de desplazamiento infinito.
 *
 * @returns {Function} Retorna la función handleScroll.
 */
const useInfiniteScroll = () => {
    return handleScroll;
};

export default useInfiniteScroll;
