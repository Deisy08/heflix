import React, { useState, useEffect } from 'react';
import GlobalStyle from "./GlobalStyle";
import Header from "./Componentes/Header"
import Home from "./Pages/Home";
import NewCategoria from "./Pages/NewCategoria";
import NewVideo from "./Pages/NewVideo";
import Error404 from "./Pages/error404";
import Footer from "./Componentes/Footer";
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import styled from 'styled-components';


function App() {

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const response = await fetch('http://localhost:3000/categorias');
      const data = await response.json();
      setCategorias(data);
      localStorage.setItem('categorias', JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  };
  
  const addCategoria = (categoria) => {
    console.log(categoria);
    const nuevaLista = [...categorias, categoria]
    setCategorias(nuevaLista)
    fetchCategorias();// Llama a fetchCategorias para actualizar los datos
  }

  const [isMobileView, setIsMobileView] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    // Agregar un event listener para controlar los cambios de tamaño de la ventana
    window.addEventListener('resize', handleResize);

    // Llamar a handleResize al cargar la página para verificar el tamaño inicial
    handleResize();

    // Eliminar el event listener al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const Enlace = styled.footer`
    background: #2a7ae4;
    color: #fff;
    display: flex;
    justify-content: center;
    padding: 10px 0;
    cursor: pointer;
  `
  const a = {
    color: "none",
    textDecoration:"none"
}
  
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path='/' element={<Home card={categorias}/>} />
        <Route path='/NewCategorie' element={<NewCategoria addCategoria={addCategoria}  fetch={fetchCategorias}/>} />
        <Route path='/NewVideo' element={<NewVideo card={categorias} addCategoria={addCategoria}/>} />
        <Route path='*' element={<Error404 />} />
      </Routes>
      
      {isMobileView ? ( <Link to="/NewVideo" style={a}>
        <Enlace onClick={() => console.log("nueva categoria")}>
          <h1>Agregar Video</h1>
        </Enlace></Link>
      ) : (
        <Footer />
      )}
           
    </Router>
  );
}

export default App;
