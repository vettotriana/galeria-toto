import React from 'react';
import Skeleton from 'react-loading-skeleton'; // Importa el componente Skeleton para efectos de carga.
import 'react-loading-skeleton/dist/skeleton.css'; // Importa los estilos CSS para Skeleton.

// Componente PostCardSkeleton para mostrar un esqueleto de carga en las tarjetas de publicaciones.
const PostCardSkeleton = () => {
    // Crea un array de 6 elementos para simular múltiples tarjetas de publicaciones.
    const arrayCount = Array(6).fill(1);

    return (
        // Mapea el array para crear esqueletos de tarjetas de publicaciones.
        arrayCount.map((val, index) =>
            <div className='card-container' key={index}>
                <div className="card-wrapper">
                    {/* Esqueleto del encabezado de la tarjeta */}
                    <div className="card-header align-center">
                        <div className="image-wrapper absolute-center">
                            {/* Esqueleto del círculo para la imagen de perfil */}
                            <Skeleton circle={true} height={42} width={42} />
                        </div>
                        <div className="profile-username">
                            {/* Esqueleto para el nombre de usuario */}
                            <Skeleton width={65} />
                        </div>
                    </div>
                    {/* Esqueleto para la imagen de la publicación */}
                    <div className="post-wrapper">
                        <Skeleton height={300} />
                    </div>
                    {/* Esqueletos para las secciones inferiores de la tarjeta */}
                    <div className="card-bottom">
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </div>
                </div>
            </div>
        )
    );
}

export default PostCardSkeleton;
