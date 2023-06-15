import React, { useState, useEffect } from 'react';
import GlobalStyle from "./GlobalStyle";
import Header from "./Componentes/Header"
import Home from "./Pages/Home";
import NewCategoria from "./Pages/NewCategoria";
import NewVideo from "./Pages/NewVideo";
import Error404 from "./Pages/error404";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { buscar } from './api/api';

function App() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetchCategorias();
  }, []);

  useEffect(() => {
    // Función para recibir mensajes
    const receiveMessage = (event) => {
      // Verificar el origen del mensaje
      if (event.origin !== 'https://heflix-lac.vercel.app') {
        return;
      }

      // Realizar acciones con los datos del mensaje
      console.log('Mensaje recibido:', event.data);
    };

    // Agregar un event listener para escuchar los mensajes
    window.addEventListener('message', receiveMessage);

    // Limpiar el event listener al desmontar el componente
    return () => {
      window.removeEventListener('message', receiveMessage);
    };
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await buscar("/categorias");
      const data = await response.json();
      setCategorias(data);
      localStorage.setItem('categorias', JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  };

  const addCategoria = (categoria) => {
    console.log(categoria);
    const nuevaLista = [...categorias, categoria];
    setCategorias(nuevaLista);
    fetchCategorias(); // Llama a fetchCategorias para actualizar los datos
  };

  // Función para enviar mensajes
  const sendMessage = () => {
    const message = 'Hola, esta es una prueba de mensaje';
    const targetOrigin = 'https://www.youtube.com'; // Reemplaza con el origen correcto del destino

    // Enviar el mensaje al destino especificado
    window.parent.postMessage(message, targetOrigin);
  };

  return (
    <>
      <Router>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/NewCategorie' element={<NewCategoria addCategoria={addCategoria} fetch={fetchCategorias} />} />
          <Route path='/NewVideo' element={<NewVideo addCategoria={addCategoria} />} />
          <Route path='*' element={<Error404 />} />
        </Routes>
      </Router>
      <button onClick={sendMessage}>Enviar Mensaje</button> {/* Agrega un botón para enviar el mensaje */}
    </>
  );
}

export default App;
