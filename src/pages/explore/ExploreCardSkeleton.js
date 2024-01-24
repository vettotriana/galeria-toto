import Skeleton from 'react-loading-skeleton'; // Importa el componente Skeleton para efectos de carga.
import 'react-loading-skeleton/dist/skeleton.css'; // Importa los estilos CSS para Skeleton.
import React from 'react';

/**
 * Componente ExploreCardSkeleton para mostrar un esqueleto de carga en la p�gina de exploraci�n.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {number} props.number - N�mero de esqueletos a mostrar.
 */
const ExploreCardSkeleton = ({ number }) => {
    // Crea un array basado en el n�mero especificado para generar m�ltiples esqueletos.
    const arrayCount = Array(number).fill(1);

    return (
        // Mapea el array para crear esqueletos de tarjetas de exploraci�n.
        arrayCount.map((val, index) =>
            <div className='explore-post-container' key={index} style={{ border: 'none' }}>
                {/* Esqueleto para la imagen de la publicaci�n */}
                <div className="explore-post-image">
                    <Skeleton height={'100%'} />
                </div>
            </div>
        )
    );
}

export default ExploreCardSkeleton;
