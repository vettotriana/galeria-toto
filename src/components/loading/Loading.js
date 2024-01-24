import React from 'react';
import './Loading.css'; // Importa los estilos CSS para el indicador de carga.

// Componente Loading para mostrar un indicador de carga (spinner).
const Loading = () => {
    return (
        <div className="loading-spinner-wrapper">
            {/* Imagen de un spinner que se muestra mientras se carga el contenido. */}
            <img
                src="/images/loadSpinner.svg" // Ruta de la imagen del spinner.
                alt="indicador de carga" // Texto alternativo para la imagen.
                className='loading-image' // Clase para aplicar estilos CSS.
            />
        </div>
    );
}

export default Loading;
