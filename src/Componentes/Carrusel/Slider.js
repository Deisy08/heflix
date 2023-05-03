import React,{ useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
//import Card from "./VideoCard"

const SliderComponente = ({ tarjeta }) => {
  const {colorFondoBorde,categoria} = tarjeta
  const [cards, setCards] = useState([ ]);
    
  useEffect(() => {
    async function fetchCards() {
      const response = await fetch('http://localhost:3000/cards');
      const data = await response.json();
      console.log(data);
      setCards(data);
    }
    fetchCards();
  }, []);

  // Filtrar las tarjetas que pertenecen a la categoría del tipo de artista
  const filteredCards = cards.filter(card => card.categoria === categoria);
    
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: filteredCards.length >= 4 ? 4 : filteredCards.length,
    slidesToScroll: 1,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };
    
  const sliderContenedor ={
    padding: "0 25px",
    marginBottom: "20px",
  }

  const obj = { 
    background: colorFondoBorde,
    padding: "10px 25px",
    borderRadius: "5px",
    display: "inline-block",
    marginBottom: "20px",
    fontStyle: "normal",
    fontWeight: 400,
  }

  const contenedorTarjeta = { 
    border: "2px solid ",        
    borderColor : colorFondoBorde,
    borderRadius: "5px",        
    margin:"0 5px",
    width: "160px",       
    height:"160px",
    boxSizing: "border-box",
  }

  return <div style={sliderContenedor}>

    <h3 style={obj}>{categoria}</h3>

    <Slider {...settings} >
      {filteredCards.map(card => (
        <section key={card.id}>
          <img style={contenedorTarjeta} src={card.imgVideo} alt={card.titulo} />
        </section>
      ))}
            
    </Slider>
        
  </div>
}

export default SliderComponente