/**
 * Funci�n handleScroll para manejar el desplazamiento infinito en una p�gina.
 *
 * @param {Object} params - Par�metros para la funci�n de manejo de desplazamiento.
 * @param {number} params.postLimit - L�mite actual de publicaciones a mostrar.
 * @param {number} params.postCount - N�mero total de publicaciones disponibles.
 * @param {Function} params.setPostLimit - Funci�n para establecer el nuevo l�mite de publicaciones.
 * @param {number} params.increaseLimitBy - Cantidad por la que se aumentar� el l�mite de publicaciones.
 */
const handleScroll = ({
    postLimit,
    postCount,
    setPostLimit,
    increaseLimitBy,
}) => {
    // Obtiene propiedades de desplazamiento del documento.
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    // Verifica si el usuario ha llegado cerca del final de la p�gina.
    if (scrollTop + clientHeight >= scrollHeight - 20) {
        // Aumenta el l�mite de publicaciones si a�n no se han cargado todas.
        if (postLimit <= postCount) {
            setPostLimit(postLimit + increaseLimitBy);
        }
    }
};

/**
 * Hook useInfiniteScroll para proporcionar la funcionalidad de desplazamiento infinito.
 *
 * @returns {Function} Retorna la funci�n handleScroll.
 */
const useInfiniteScroll = () => {
    return handleScroll;
};

export default useInfiniteScroll;
