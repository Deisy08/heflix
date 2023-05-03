import SliderComponente from "./Slider"
import {Container, Box} from '@mui/material';
import React from 'react';


const Carrusel = ({card}) => {
    
    return (
      <Container maxWidth="xl">
        <Box sx={{ padding: '15px' }} />

        {card.map((item)=> <SliderComponente  tarjeta={item}  key={item.id} /> )}
        
      </Container>
    );
  };
  
export default Carrusel;
  