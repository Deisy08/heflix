import React,{ useState, useEffect } from 'react';
import Slider from "react-slick";
import styled from 'styled-components';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ReactPlayer from "react-player/lazy";
import { HiOutlinePencilAlt } from "react-icons/hi"
import { AiOutlineDelete } from "react-icons/ai"
import { Button, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter, } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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

  //estilos 
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
   position: relative;
 `
 const eliminar = {
  position: "absolute",
  right: "30px",
  top: "60px",
  cursor: "pointer"
 }

 const editar = {
  position: "absolute",
  right: "50px",
  top: "60px",
  cursor: "pointer"
 }

  // Filtrar las tarjetas que pertenecen a la categoría del tipo de artista
  const filteredCards = cards.filter(card => card.categoria === categoria);
 
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: filteredCards.length >= 5 ? 5 : filteredCards.length,
    slidesToScroll: 1,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 508, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
    ]
  };

  const slider = {
    padding: "0 10px",
  }

  const TarjetaImg = styled.img`
    border: 2px solid ${colorFondoBorde};
    background: ${colorFondoBorde};
    padding: 0 5px;
    border-radius: 5px;
    width: 100%;
    height: 260px;
    box-sizing: border-box;
    cursor: pointer;
    /*&:hover {
      border: 2px solid ${colorFondoBorde};
      width: 175px;
      height: 175px;
      border-radius: 5px;
      box-shadow: 0 0 10px ${colorFondoBorde};
    }*/
    @media (min-width: 768px){
      width: 100%;
      height: 225px;
    }
    @media (min-width: 1024px){
      width: 100%;
      height: 200px;
    }
  `;
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(null);
  
  const handleImageClick = (video) => {
    //console.log(video);
    setSelectedVideoIndex({ url: video.video});
  };

  const VideoPlayer = ({ onClose, url ,titulo}) => {
    console.log(titulo);
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

  //visibilidad de mi modal
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [btnEditar, setBtnEditar] = useState(null);
  const [btnEliminar, setBtnEliminar] = useState(null);
  //inputs de mi cartilla
  const [titulo,setTitulo]= useState("")
  const [video,setVideo]= useState("")
  const [imgVideo,setImgVideo]= useState("")
  const [descripcion,setDescripcion]= useState("")
  const [cate,setCate]= useState("")
  const [usuario,setUsuario]= useState("")
 
  useEffect(() => {
    fetch('http://localhost:3000/cards')
    .then(response => response.json())
    .then(data => setData(data))
    .catch(error => console.error(error));
  }, []);

  const handleClose = () =>{
  setShow(false);
  };
  const handleShow = (item) => {
    setBtnEditar(item.id)
    setTitulo(item.titulo)
    setVideo(item.video)
    setImgVideo(item.imgVideo)
    setDescripcion(item.descripcion)
    setCate(item.categoria)
    setUsuario(item.usuario)
		setShow(true);
  };

  //editar tarjeta
  const editarCard = () =>{
    const confirmed = window.confirm('¿Estás seguro de que deseas editar este elemento?');
      if (!confirmed) {
        return; 
      }
    const url = `http://localhost:3000/cards/${btnEditar}`;
    //console.log(url);//console.log(btnEditar);
		  fetch(url, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          titulo: titulo,
          video: video, 
          imgVideo: imgVideo,
          descripcion: descripcion,
          categoria:cate,
          usuario: usuario
        })
      })
      .then(response => {
          if (!response.ok) {
            throw new Error('Error al actualizar la cartilla');
          }
          return response.json();
        })
      .then(data => {
        console.log('Datos actualizados:', data);
        setData(data);
        setShow(false);
        
      })
      .catch(error => console.error(error));
      //window.location.reload()
  }

  // eliminar tarjeta
  const eliminarCard = async (id) =>{
    setBtnEliminar(id)
    const url = `http://localhost:3000/cards/${id}`;
    //console.log(url);
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este elemento?');
      if (!confirmed) {
        return; 
      }
    await fetch(url,{
        method: "DELETE",
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Datos actualizados:', data);
        setData(data);
        setBtnEliminar(null);
    })
    .catch(err => console.log(err)) 
  }

  //validaciones
  const isValidTitulo = /^[A-Z][a-zA-Z][\w\W][\s\S]{2,25}$/.test(titulo);
  const isValidVideo = /^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/.test(video);
  const isValidImgVideo = /^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/.test(imgVideo);
  const isValidDescription = /([A-Z][a-z][\w\W][\s\S]{5,115})$/.test(descripcion);
  const isValidCategoria = /^[a-zA-Z0-9][\w\W][\s\S]+$/.test(usuario)
  const isValidUsuario = /^[a-zA-Z0-9][\w\W][\s\S]+$/.test(usuario)
  
  return <>
    <SliderContenedor >
      <Titulo >{categoria}</Titulo>
      <Slider {...settings} style={slider} >
        {cards.length>0 && filteredCards.map((video) => (
          <ContenedorImg key={video.id} >
            <p>{video.titulo}</p> 
            <HiOutlinePencilAlt style={editar} onClick={() => handleShow(video)} /> 
            <AiOutlineDelete style={eliminar} onClick={() => eliminarCard(video.id)} />
            <TarjetaImg  src={video.imgVideo} alt={video.titulo} onClick={() => handleImageClick(video)}/>
            <p>{video.usuario}</p>
          </ContenedorImg>
        ))}
      </Slider>
      {selectedVideoIndex  && (
          <VideoPlayer url={selectedVideoIndex.url} onClose={() => setSelectedVideoIndex(null)} />
      )}
    </SliderContenedor>
    <Modal 
      size="lg"
      show={show} 
      onHide={handleClose}
      centered
      style={{color:"black"}}
    >
      <ModalHeader closeButton>
        <Modal.Title>Editar cartilla</Modal.Title>
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <label>Titulo:</label>
          <input
            className={`form-control ${titulo !== null ? (isValidTitulo ? 'is-valid' : 'is-invalid') : ''}`}
            type="text"
            value={titulo}
            onChange={(e)=>{ 
              setTitulo(e.target.value);
            }}
          />
          {titulo !== null && !isValidTitulo && <div className="invalid-feedback">El nombre de esta categoria debe comenzar en mayúscula.</div>}
        </FormGroup>
              
        <FormGroup>
          <label>
            Video: 
          </label>
          <input
            className={`form-control ${video !== null ? (isValidVideo ? 'is-valid' : 'is-invalid') : ''}`}
            type="text"
            value={video}
            onChange={(e)=>{ 
              setVideo(e.target.value);
            }}
          />
          {video !== null && !isValidVideo && <div className="invalid-feedback">El video de esta categoria debe ser la original.</div>}
        </FormGroup>
              
        <FormGroup>
          <label>
            Imagen del video: 
          </label>
          <input
          className={`form-control ${imgVideo !== null ? (isValidImgVideo ? 'is-valid' : 'is-invalid') : ''}`}
          type="text"
          value={imgVideo}
          onChange={(e)=>{ 
            setImgVideo(e.target.value);
          }}
          />
          {imgVideo !== null && !isValidImgVideo && <div className="invalid-feedback">La imagen del video.</div>}
        </FormGroup>

        <FormGroup>
          <label>
            Descripción: 
          </label>
          <textarea
          className={`form-control ${descripcion !== null ? (isValidDescription ? 'is-valid' : 'is-invalid') : ''}`}
          type="text"
          value={descripcion}
          onChange={(e)=>{ 
            setDescripcion(e.target.value);
          }}
          />
          {descripcion !== null && !isValidDescription && <div className="invalid-feedback">La descripción debe comenzar en mayúscula.</div>}
        </FormGroup>

        <FormGroup>
          <label>
            Categoria: 
          </label>
          <input
          className={`form-control ${cate !== null ? (isValidCategoria ? 'is-valid' : 'is-invalid') : ''}`}
          type="text"
          value={cate}
          onChange={(e)=>{ 
            setCate(e.target.value);
          }}
          />
          {cate !== null && !isValidCategoria && <div className="invalid-feedback">La categoria debe de existir.</div>}
        </FormGroup>
        
        <FormGroup>
          <label>
            Usuario: 
          </label>
          <input
          className={`form-control ${usuario !== null ? (isValidUsuario ? 'is-valid' : 'is-invalid') : ''}`}
          type="text"
          value={usuario}
          onChange={(e)=>{ 
            setUsuario(e.target.value);
          }}
          />
          {usuario !== null && !isValidUsuario && <div className="invalid-feedback">La usuario debe de existir.</div>}
        </FormGroup>
      </ModalBody>

      <ModalFooter>
        <Button
          color="primary"
          onClick={editarCard}
        >
          Editar
        </Button>
        <Button
          color="danger"
          onClick={handleClose}
        >
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  </>
  
}

export default SliderComponente