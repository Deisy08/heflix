import React,{ useState, useEffect } from 'react';
import Slider from "react-slick";
import styled from 'styled-components';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ReactPlayer from "react-player/lazy";
import { HiOutlinePencilAlt } from "react-icons/hi"
import { AiOutlineDelete } from "react-icons/ai"
import { Button, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactModal from 'react-modal';
import axios from 'axios';
// css de mi modal de video
const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
  },
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    height: '75%',
    border: 'none',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    padding: '0',
    backgroundColor: '#000000E5',
  },
};

const SliderComponente = ({ tarjeta }) => {

  const {colorFondoBorde,categoria} = tarjeta
  const [cards, setCards] = useState([ ]);
  const [reloadCards, setReloadCards] = useState(false); // Estado adicional para recargar las tarjetas
  const [selectedVideoI, setSelectedVideoI] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    async function fetchCards() {
      const response = await fetch('https://646d54f79c677e232189ed4f.mockapi.io/api/cards');
      const data = await response.json();
      setCards(data);
    }
    fetchCards();
  }, [reloadCards]); // Agregar reloadCards como dependencia

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
 const ContenedorImg = styled.div`
    padding: 0 10px;
    position: relative;
    display: inline-block;
    
    @media (min-width: 768px) {
      max-width: 255px;
    }
    @media (min-width: 1024px) {
      max-width: 300px;
    }
 `
 const eliminar = {
  position: "absolute",
  width: "23px",
  height:"23px",
  right: "23px",
  top: "50px",
  cursor: "pointer",
  color:colorFondoBorde,
 }
 const editar = {
  position: "absolute",
  width: "23px",
  height:"23px",
  right: "50px",
  top: "50px",
  cursor: "pointer",
  color:colorFondoBorde,
 }
 //css de mi modal del contenido del video
 const title ={
  fontWeight: "600",
  color: colorFondoBorde,
  fontFamily: 'Source Sans Pro',
  padding: "10px",
 }
  const User =styled.h5`
    padding-left: 10px;
    
  `;
  const descript ={
    padding: "10px 20px 0",
  }
  const Btn= styled.button`
    padding: 10px;
    background-color: ${colorFondoBorde};
    border: none;
    border-radius: 10px;
    color: #fff;
    margin-left: 10px;
    &:hover {
      box-shadow: 0 0 10px ${colorFondoBorde};
    }
  `;

  const filteredCards = cards.filter(card => card.categoria === categoria);  // Filtrar las tarjetas que pertenecen a la categoría del tipo de artista
  
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
          slidesToShow: filteredCards.length >= 1 ? 1 : filteredCards.length,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: filteredCards.length >= 2 ? 2 : filteredCards.length,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: filteredCards.length >= 3 ? 3 : filteredCards.length,
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
    height: 250px;
    box-sizing: border-box;
    cursor: pointer;
    @media (min-width: 768px){
      width: 100%;
      height: 200px;
    }
  `;

  const handleImageClick = (video) => {
    //console.log(video);
    setSelectedVideoI({ url: video.video, user: video.usuario, description:video.descripcion, title:video.titulo});
  };

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  
  const VideoPlayer = ({ onClose, url, usuario, descripcion, titulo}) => {
    //console.log(usuario, descripcion, titulo);
    return (
      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Video Popup"
        style={customStyles}
      >
        <ReactPlayer 
            url={url}
            controls
            playing={true}
            width="auto"
            height="calc(60vh - 200px)"
        />
        <h1 style={title} >{usuario}</h1>
        <User>{titulo}</User>
        <p style={descript}>{descripcion}</p>
        <Btn onClick={onClose}>Cerrar</Btn>
    </ReactModal>
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
 //console.log(btnEliminar);
  useEffect(() => {
    fetch('https://646d54f79c677e232189ed4f.mockapi.io/api/cards')
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
  const editarCard = () => {
    const confirmed = window.confirm('¿Estás seguro de que deseas editar este elemento?');
    if (!confirmed) {
      setShow(false)
      return;
    }
  
    const url = `https://646d54f79c677e232189ed4f.mockapi.io/api/cards/${btnEditar}`;
    axios.put(url, {
      titulo: titulo,
      video: video,
      imgVideo: imgVideo,
      descripcion: descripcion,
      categoria: cate,
      usuario: usuario
    })
    .then(response => {
      const updatedData = data.map(item => {
        if (item.id === btnEditar) {
          return {
            ...item,
            titulo: titulo,
            video: video,
            imgVideo: imgVideo,
            descripcion: descripcion,
            categoria: cate,
            usuario: usuario
          };
        }
        return item;
      });
      
      console.log('Datos actualizados:', updatedData);
      setData(updatedData);
      setShow(false);
      setReloadCards(!reloadCards);
    })
    .catch(error => console.error(error));
  };
  
  // eliminar tarjeta
  const eliminarCard = async (id) =>{
    setBtnEliminar(id)
    const url = `https://646d54f79c677e232189ed4f.mockapi.io/api/cards/${id}`;
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
        setReloadCards(!reloadCards);
    })
    .catch(err => console.log(err)) 
  }

  //validaciones
  const isValidTitulo = /(^[A-ZÁÉÍÓÚÑ][a-záéíóúñ\s\S]{2,24})$/.test(titulo);
  const isValidVideo = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([a-zA-Z0-9_-]{11})/.test(video);
  const isValidImgVideo = /^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/.test(imgVideo);
  const isValidDescription = /(^[A-ZÁÉÍÓÚÑ][a-záéíóúñ\s\S]{5,400})$/.test(descripcion);
  const isValidCategoria = /^[a-zA-Z0-9\s\S]+$/.test(cate)
  const isValidUsuario = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s.\-_@&()|']{3,30}$/.test(usuario)
  //json-server -w db.json -p 5000
  return <>
    <SliderContenedor >
      <Titulo >{categoria}</Titulo>
      <Slider {...settings} style={slider} >
        {cards.length>0 && filteredCards.map((video) => (
          <ContenedorImg  >
            <div key={video.id}>
              <h5>{video.titulo}</h5> 
              <HiOutlinePencilAlt style={editar} onClick={() => handleShow(video)} /> 
              <AiOutlineDelete style={eliminar} onClick={() => eliminarCard(video.id)} />
              <TarjetaImg  src={video.imgVideo} alt={video.titulo} onClick={() => {handleImageClick(video); openModal()}}/>
              <h6>{video.usuario}</h6>
            </div>
          </ContenedorImg>
        ))}
      </Slider>
      {selectedVideoI  && (
          <VideoPlayer url={selectedVideoI.url} usuario={selectedVideoI.user} descripcion={selectedVideoI.description} titulo={selectedVideoI.title} onClose={() => setSelectedVideoI(null)} />
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
          {titulo !== null && !isValidTitulo && <div className="invalid-feedback">El título debe tener entre 2 y 25 letras (comienza con mayúscula) y permitir mayúsculas, minúsculas, espacios, y la letra "ñ".</div>}
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
          {video !== null && !isValidVideo && <div className="invalid-feedback">El enlace de video no es válido.</div>}
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
          {imgVideo !== null && !isValidImgVideo && <div className="invalid-feedback">El enlace de imagen no es válido.</div>}
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
          {descripcion !== null && !isValidDescription && <div className="invalid-feedback">La descripción debe comenzar con mayúscula y puede contener letras, espacios, tildes y la letra "ñ"(de 5 hasta 400 caracteres).</div>}
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
          {usuario !== null && !isValidUsuario && <div className="invalid-feedback">En el campo usuario puede comienza con mayúscula ,tildes y puede tener carecteres especiales(-_@&()|').</div>}
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