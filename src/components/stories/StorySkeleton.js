import React from 'react';
import Skeleton from 'react-loading-skeleton'; // Importa el componente Skeleton para efectos de carga.
import 'react-loading-skeleton/dist/skeleton.css'; // Importa los estilos CSS para Skeleton.

// Componente StorySkeleton para mostrar un esqueleto de carga en la sección de historias.
const StorySkeleton = () => {
    // Crea un array de 6 elementos para simular múltiples historias.
    const arrayCount = Array(6).fill(1);

    return (
        // Mapea el array para crear esqueletos de historias.
        arrayCount.map((val, index) =>
            <div className="story-wrapper" key={index}>
                {/* Esqueleto de imagen de perfil de la historia */}
                <div className="story-profile-image-skeleton">
                    <Skeleton circle={true} height={50} width={50} />
                </div>
                {/* Esqueleto del nombre de usuario de la historia */}
                <div className="username-wrapper">
                    <Skeleton />
                </div>
            </div>
        )
    );
}

export default StorySkeleton;
