import React, { useState } from 'react';
import GlobalStyle from "./GlobalStyle";
import Header from "./Componentes/Header"
import Home from "./Pages/Home";
import NewCategoria from "./Pages/NewCategoria";
import NewVideo from "./Pages/NewVideo";
import Error404 from "./Pages/error404";
import Footer from "./Componentes/Footer";

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {

  const [categorias, setCategorias] = useState(() => {
    const categoriasGuardadas = localStorage.getItem('categorias');
    return categoriasGuardadas ? JSON.parse(categoriasGuardadas) : [
      { categorias: 'Grupo', colorFondoBorde: '#6BD1FF' },
      { categorias: 'Solista', colorFondoBorde: '#FF8C2A' },
    ];
  });
  
  console.log(categorias);

  const addCategoria = (categoria) => {
    console.log(categoria);
    const nuevaLista = [...categorias, categoria]
    setCategorias(nuevaLista)
    localStorage.setItem('categorias', JSON.stringify(nuevaLista));
  }
  
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path='/' element={<Home card={categorias}/>} />
        <Route path='/NewCategorie' element={<NewCategoria addCategoria={addCategoria} />} />
        <Route path='/NewVideo' element={<NewVideo card={categorias} addCategoria={addCategoria}/>} />
        <Route path='*' element={<Error404 />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
