import React from "react";
import "./LoadingCircle.css"; // Importa los estilos CSS para el c�rculo de carga.

// Componente LoadingCircle para mostrar un indicador de carga circular.
const LoadingCircle = () => {
    return (
        // Contenedor del c�rculo de carga.
        <div className="loading-circle absolute-center">
            {/* SVG que representa el c�rculo de carga. */}
            <svg width="100px" height="100px" className="svg-circle">
                {/* El c�rculo animado dentro del SVG. */}
                <circle
                    cx="50" // Coordenada x del centro del c�rculo.
                    cy="50" // Coordenada y del centro del c�rculo.
                    r="15" // Radio del c�rculo.
                    fill="none" // Sin relleno.
                    stroke="#0095f6" // Color del borde del c�rculo.
                    strokeWidth="3" // Ancho del borde del c�rculo.
                    strokeDasharray="70.68583470577033 25.561944901923447" // Define el patr�n de guiones y espacios en el borde del c�rculo.
                ></circle>
            </svg>
        </div>
    );
};

export default LoadingCircle;

