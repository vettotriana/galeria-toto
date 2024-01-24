import React from "react";
import "./LoadingCircle.css"; // Importa los estilos CSS para el círculo de carga.

// Componente LoadingCircle para mostrar un indicador de carga circular.
const LoadingCircle = () => {
    return (
        // Contenedor del círculo de carga.
        <div className="loading-circle absolute-center">
            {/* SVG que representa el círculo de carga. */}
            <svg width="100px" height="100px" className="svg-circle">
                {/* El círculo animado dentro del SVG. */}
                <circle
                    cx="50" // Coordenada x del centro del círculo.
                    cy="50" // Coordenada y del centro del círculo.
                    r="15" // Radio del círculo.
                    fill="none" // Sin relleno.
                    stroke="#0095f6" // Color del borde del círculo.
                    strokeWidth="3" // Ancho del borde del círculo.
                    strokeDasharray="70.68583470577033 25.561944901923447" // Define el patrón de guiones y espacios en el borde del círculo.
                ></circle>
            </svg>
        </div>
    );
};

export default LoadingCircle;

