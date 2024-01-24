import React from 'react';
import './LoadPhotogram.css'; // Importa los estilos CSS para el componente de carga.

// Componente LoadPhotogram para mostrar un indicador de carga con el logo de Toto.
const LoadPhotogram = () => {
    return (
        // Contenedor principal del indicador de carga.
        <div className='load-instagram-container absolute-center'>
            {/* Contenedor de la imagen del logo. */}
            <div className="load-instagram-image-wrapper">
                {/* Imagen del logo de Toto utilizada como indicador de carga. */}
                <img src="/images/toto-logo.png" alt="logo de Toto" />
            </div>
        </div>
    )
}

export default LoadPhotogram;
