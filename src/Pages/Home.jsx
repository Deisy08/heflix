import React, { useState, useEffect } from 'react';
import Footer from "../Componentes/Footer";
import { Link } from 'react-router-dom';
import Banner from "../Componentes/Banner";
import Carrusel from "../Componentes/Carrusel/Carrusel";
import styled from 'styled-components';


function Home() {

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
    
    return <>
        
        <Banner />
        <Carrusel />
        {isMobileView ? ( <Link to="/NewVideo" style={a}>
        <Enlace onClick={() => console.log("nueva categoria")}>
          <h1>Agregar Video</h1>
        </Enlace></Link>
      ) : (
        <Footer />
      )}
  </>
}



export default Home