import SliderComponente from "./Slider"
import {Container, Box} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { buscar } from "../../api/api";

const Carrusel = () => {
  const [categorias, setCategorias] = useState([])

  useEffect(() => {
    buscar(`/categorias`, setCategorias)
  }, [])

  return (
      <Container maxWidth="xl">
        <Box sx={{ padding: '15px' }} />

        {categorias.map((item)=> <SliderComponente  tarjeta={item}  key={item.id} /> )}
        
      </Container>
    );
  };
  
export default Carrusel;
  