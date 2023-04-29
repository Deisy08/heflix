import SliderComponente from "./Slider"
import {Container, Box} from '@mui/material';
import React from 'react';


const Carrusel = (props) => {
    
    const card = props.card
  
    return (
      <Container maxWidth="xl">
        <Box sx={{ padding: '15px' }} />

        {card.map((categoria, i)=><SliderComponente  tarjeta={categoria}  key={i} />)}
        
      </Container>
    );
  };
  
export default Carrusel;
  