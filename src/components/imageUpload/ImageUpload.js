import React, { useContext, useRef, useState } from 'react';
import './ImageUpload.css'; // Importando estilos CSS personalizados
import { storage, db, auth } from '../../config/FirebaseConfig'; // Importando configuraciones de Firebase
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import Loading from '../loading/Loading'; // Componente de carga
import { RxCross2 } from 'react-icons/rx'; // Icono para botón de cancelar
import firebaseContex from '../../context/FirebaseContex'; // Contexto de Firebase


const ImageUpload = () => {
  const { isUpload, setIsUpload } = useContext(firebaseContex);

  // Declarando estados del componente
  const [image, setImage] = useState('');
  const [caption, setCaption] = useState('');
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');

  // Referencias para elementos de la cámara y el canvas
  const imageRef = useRef();
  const [loading, setLoading] = useState(false);
  const videoRef = useRef();
  const canvasRef = useRef();
   let videoStream = null;

  // Función para capturar video desde la cámara del dispositivo
    const handleCapture = async () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = videoStream;
                    videoRef.current.play();
                }
            } catch (error) {
                console.error("Error al acceder a la cámara:", error);
            }
        }
    };

    // Función para tomar una foto y cerrar la cámara
    const handleTakePhoto = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (video && canvas) {
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob) => {
                setImage(blob);
            });

            // Cerrar la cámara
            if (videoStream) {
                const tracks = videoStream.getTracks();
                tracks.forEach(track => track.stop());
            }
        }
    };

// Función para manejar la subida de la imagen
    const handleUpload = () => {
        if (image) {
            setLoading(true);
            let fileToUpload = image;

            if (image instanceof Blob) {
                // Generar un nombre de archivo único
                const timestamp = new Date().getTime(); // Tiempo actual en milisegundos
                const randomNumber = Math.floor(Math.random() * 1000); // Número aleatorio entre 0 y 999
                const uniqueName = `photo${timestamp}${randomNumber}.jpg`; // Nombre de archivo único

                fileToUpload = new File([image], uniqueName, { type: "image/jpeg" });
            }

            const storageRef = ref(storage, `/images/${fileToUpload.name}`);
            const uploadTask = uploadBytesResumable(storageRef, fileToUpload);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const percentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    setProgress(percentage);
                },
                (error) => {
                    console.log(error);
                    setCaption('');
                    imageRef.current.value = '';
                    setProgress(0);
                    setLoading(false);
                    setMessage(error.message);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    await addDoc(collection(db, 'posts'), {
                        userId: auth.currentUser.uid,
                        imageUrl: downloadURL,
                        username: auth.currentUser.displayName,
                        caption: caption,
                        likes: [],
                        comments: [],
                        datePostedOn: serverTimestamp(),
                    });

                    setCaption('');
                    imageRef.current.value = '';
                    setImage('');
                    setProgress(0);
                    setLoading(false);
                    setMessage('Image uploaded successfully');
                    setTimeout(() => {
                        setMessage('');
                    }, 5000);
                }
            );
        }
    };

  // Función para manejar el cierre del componente
  const handleClose = () => {
    setCaption('')
    setImage('')
    imageRef.current.value = ''
    setProgress(0);
    setMessage('')
    setIsUpload(false)
  }



  return (
    <div className="upload-model-container absolute-center" style={{ display: isUpload ? 'flex' : 'none' }} >

      <div className="image-upload-container absolute-center" >

              <div className='image-upload-wrapper' >

                  {/* Botones para capturar y tomar foto, con estilos de Bootstrap */}
                  <button className="btn btn-primary" onClick={handleCapture}>Capturar Foto</button>
                  <video ref={videoRef} className="img-thumbnail" style={{ width: '100%', height: '100%' }}></video>
                  <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                  <button className="btn btn-secondary" onClick={handleTakePhoto}>Tomar Foto</button>

                  {/* Área de texto para el título de la imagen */}
          <textarea
            type="text"
            placeholder='Agregale un texto (opcional)'
            className='caption-textarea'
            onChange={(e) => setCaption(e.target.value)}
            value={caption}
                  />

                  {/* Input para seleccionar imagen */}
                  <input type="file"
                      title='Seleccionar imagen'
                      placeholder='Seleccionar imagen'
                      onChange={(e) => setImage(e.target.files[0])}
                      accept="image/*"
                      className='form-control image-select-input'
                      ref={imageRef}
                  />

                    {/* Botones y barra de progreso para la subida de la imagen */}
                    <div className="button-wrapper">
                        <button
                            type='button'
                            title='Subir'
                            onClick={handleUpload}
                            disabled={!image}
                            className='btn btn-success upload-btn cur-point'
                            style={{ opacity: (!image || loading) && '0.5' }}
                        >
                            Subir
                        </button>
                        {loading && <Loading />}
                    </div>

                    {progress > 0 && <div className="progress">
                        <div className="progress-bar" role="progressbar" style={{ width: `${progress}%` }}>
                            {progress}%
                        </div>
                    </div>}
                    {message && <div className="alert alert-info">{message}</div>}

                </div>
            </div>

            {/* Botón para cerrar el componente */}
            <button
                type='button'
                title='Cancelar'
                className='btn btn-danger cancel-btn cur-point'
                onClick={handleClose}
            >
                <RxCross2 style={{ height: '100%', width: '100%' }} />
            </button>
        </div>
    );
}

export default ImageUpload;