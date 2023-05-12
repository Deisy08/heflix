import React,{ useState, useEffect } from 'react';
import Slider from "react-slick";
import styled from 'styled-components';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ReactPlayer from "react-player";
//import VideoCard from './videoCard';

const SliderComponente = ({ tarjeta }) => {
  const {colorFondoBorde,categoria} = tarjeta
  const [cards, setCards] = useState([ ]);
    
  useEffect(() => {
    async function fetchCards() {
      const response = await fetch('http://localhost:3000/cards');
      const data = await response.json();
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
    
  const SliderContenedor = styled.div`
    padding: 0 25px;
    margin-bottom: 20px;
  `
  const Titulo= styled.h3`
    background: ${colorFondoBorde};
    padding: 10px 25px;
    border-radius: 5px;
    display: inline-block;
    margin-bottom: 20px;
    font-style: normal;
    font-weight: 400;
  `
  const ContenedorImg = styled.section`
    padding: 10px;
    display: flex;
    justify-content: center;
  `

  const slider = {
    padding: "0 10px",
  }

  const TarjetaImg = styled.img`
    border: 2px solid ${colorFondoBorde};
    border-radius: 5px;
    width: 160px;
    height: 160px;
    box-sizing: border-box;
    cursor: pointer;
    &:hover {
      border: 2px solid ${colorFondoBorde};
      width: 175px;
      height: 175px;
      border-radius: 5px;
      box-shadow: 0 0 10px ${colorFondoBorde};
    }
  `;
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
  //console.log(selectedVideoIndex); todas la tarjetas
  const handleImageClick = (video) => {
    console.log({ url: video.video })
    setSelectedVideoIndex({ url: video.video });

  };
  //console.log(cards.length>0 && cards.map((item) => item.video))
  const VideoPlayer = ({ onClose, url }) => {
    
    console.log(url);
    return (
      <div>
        <ReactPlayer 
            url={url}
            controls
            volume="0.5"
            playing={true}
            width="500px"
            height="300px"
        />
        <button onClick={onClose}>Close</button>
      
    </div>
    );
  };

  return <SliderContenedor >

    <Titulo >{categoria}</Titulo>

    <Slider {...settings} style={slider} >
      {cards.length>0 && filteredCards.map((video) => (
        <ContenedorImg key={video.id} >
          <p>{video.titulo}</p>
          <TarjetaImg  src={video.imgVideo} alt={video.titulo} onClick={() => handleImageClick(video)}/>
          <p>{video.usuario}</p>
        </ContenedorImg>
      ))}
    </Slider>
    {selectedVideoIndex  && (
        <VideoPlayer url={selectedVideoIndex.url} onClose={() => setSelectedVideoIndex(null)} />
    )}

  </SliderContenedor>
}

export default SliderComponente