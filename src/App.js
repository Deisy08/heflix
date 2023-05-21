import React, { useState, useEffect } from 'react';
import GlobalStyle from "./GlobalStyle";
import Header from "./Componentes/Header"
import Home from "./Pages/Home";
import NewCategoria from "./Pages/NewCategoria";
import NewVideo from "./Pages/NewVideo";
import Error404 from "./Pages/error404";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { buscar } from './api/api';
function App() {

  const [categorias, setCategorias] = useState([]);
  useEffect(() => {
    fetchCategorias();
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
    const nuevaLista = [...categorias, categoria]
    setCategorias(nuevaLista)
    fetchCategorias();// Llama a fetchCategorias para actualizar los datos
  }
  
  return <>
    <Router>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/NewCategorie' element={<NewCategoria addCategoria={addCategoria}  fetch={fetchCategorias}/>} />
        <Route path='/NewVideo' element={<NewVideo card={categorias} addCategoria={addCategoria}/>} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </Router>
  </>
}

export default App;
