import "../../src/assets/css/newVideo.css"
import { Container, Box, Button, TextField, Autocomplete} from "@mui/material";
import { Link } from "react-router-dom"
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { validarTitulo, validarVideo, validarImgVideo, validarUsuario, validarDescripcion } from "../Componentes/validaciones/nuevoVideo";

const CssTextField = styled(TextField)({
        '& .MuiOutlinedInput-root': {
          '&:hover fieldset': {
            borderBottom:"2px solid #2A7AE4",
          }
        },
        ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input" : {
            color: "white",
            background: "#53585D",
            borderRadius : "5px",
        },
        ".css-nxo287-MuiInputBase-input-MuiOutlinedInput-input" : {
            color: "white",
        },
        ".css-wb57ya-MuiFormControl-root-MuiTextField-root":{
            margin:"20px 0 10px 0",
        },
        ".css-ptiqhd-MuiSvgIcon-root ":{
            color: "white",
        },
        ".css-i4bv87-MuiSvgIcon-root":{
            color: "white",
        },
        ".MuiOutlinedInput-root fieldset" : {
            borderColor: "transparent",
        },
        ".css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root":{
            background: "#53585D",
        },
        ".css-md26zr-MuiInputBase-root-MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: "2px solid #bf2e2e",
            borderBottom: "2px solid #bf2e2e",
        }
});

const CssTextFieldTextarea = styled(TextField)({
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderBottom:"2px solid #2A7AE4",
      }
    },
    ".css-8ewcdo-MuiInputBase-root-MuiOutlinedInput-root" : {
        background: "#53585D",
    },
    ".css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input" : {
        color: "white",
    }
});

const NewVideo = ({ card, addCategoria, location }) =>{
    
    const [categorias, setCategorias] = useState(card);
    
    useEffect(() => {
        if (location?.state?.categoria) { // Si hay una nueva categoría en el estado de ubicación
          addCategoria(location.state.categoria); // Agrega la nueva categoría a la lista de categorías
          setCategorias([...categorias, location.state.categoria]); // Actualiza el estado de las categorías
        }
    }, [location, addCategoria, categorias, card]);

    const manejarEnvio = (e) =>{
        e.preventDefault()
        console.log(titulo,video,imgVideo,descripcion,usuario,category);
        
        fetch('http://localhost:3000/cards', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                titulo: titulo.value,
                video: video.value,
                imgVideo: imgVideo.value,
                descripcion: descripcion.value,
                categoria: selectedCategory,
                usuario: usuario.value
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Datos guardados en db.json:', data)
            
        })
        .catch(error => console.error(error))

       window.location.href = '/';
    }
   //useStates de mi formulario
    const [titulo,setTitulo]= useState({
        value : "",
        valid:null
    })
    const [video,setVideo]= useState({
        value : "",
        valid:null
    })
    const [imgVideo,setImgVideo]= useState({
        value : "",
        valid:null
    })
    const [usuario,setUsuario]= useState({
        value : "",
        valid:null
    })
    const [descripcion,setDescripcion]= useState({
        value : "",
        valid:null
    })
    const [category, setCategory] = useState({
        value: "",
        valid: true
    });

    const [selectedCategory, setSelectedCategory] = useState("Grupo");
    const [isCategoryValid, setIsCategoryValid] = useState(true);


    console.log(selectedCategory);
    console.log(isCategoryValid);

    const options = card.map((option) => {
        const firstLetter = option.categoria[0].toUpperCase();
        return {
          firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
          ...option,
        };
    });

    useEffect(() => {
        setIsCategoryValid(Boolean(options.find((option) => option.categoria === selectedCategory)));
    }, [options, selectedCategory]);

    const handleFormReset = () => {
        setTitulo({value: ""});
        setVideo({value: ""});
        setImgVideo({value: ""});
        setUsuario({value: ""});
        setDescripcion({value: ""});
    };

    return <Container maxWidth="xl" className="formulario">
        <Box
            component="form"
            autoComplete="off"
            sm={{
                display: "flex",
                alignItems: "center",
                justifyContent:"center",
                flexDirection:"column",
            }}
            onSubmit={manejarEnvio}
            
        >
            <h1>Create new video</h1>

            <CssTextField  required 
                fullWidth margin="normal" 
                placeholder="Título..." type="text"
                error={titulo.valid === false} 
                helperText={titulo.valid === false && "El nombre del título debe tener al comienzo una letra en mayúscula y de entre 5 y 15 caracteres."}
                value={titulo.value}
                onChange={(input)=>{ 
                    const titulo= input.target.value
                    const tituloValido = validarTitulo(titulo)
                    setTitulo({value:titulo, valid:tituloValido})
                }}
            />

            <CssTextField  required 
                fullWidth margin="normal"
                placeholder="Link del video..." type="text"
                error={video.valid === false}
                helperText={video.valid === false && "Este campo es para la URL y debe ser valido."}
                value={video.value}
                onChange={(input)=>{ 
                    const video= input.target.value
                    const videoValido = validarVideo(video)
                    setVideo({value:video, valid:videoValido})
                }}
            />

            <CssTextField required
                fullWidth margin="normal"
                placeholder="Link de la imagen del video..." type="imgVideo"
                error={imgVideo.valid === false}
                helperText={imgVideo.valid === false && "Este campo es para la imagen del video, asegurece que su imagen sea valido."}
                value={imgVideo.value}
                onChange={(input)=>{ 
                    const imgVideo= input.target.value
                    const imgVideoValido = validarImgVideo(imgVideo)
                    setImgVideo({value:imgVideo, valid:imgVideoValido})
                }}
            />

           <Autocomplete 
                options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                groupBy={(option) => option.firstLetter}
                getOptionLabel= {(option) => option.categoria}
                multiple={false}
                fullWidth 
                renderInput={(params) => <CssTextField  
                    {...params} 
                    margin="normal" 
                    required 
                    placeholder={"Escoja una categoría..."} 
                    error={!isCategoryValid }
                    helperText={!isCategoryValid  && "Este campo no puede estar vacio, elija una categoría."}
                />}
                onChange={(event, value) => {
                    setSelectedCategory(value?.categoria || "");
                    //const categoryValue = value?.categoria;
                    //const categoryValid = !!categoryValue ;
                   // setCategory({value:categoryValue, valid:categoryValid})
                }}
            />
           
            <CssTextFieldTextarea required 
                placeholder="Describa el video..."
                fullWidth margin="normal" 
                rows={4}
                multiline
                error={descripcion.valid === false}
                helperText={descripcion.valid === false && "Este campo debe comenzar con una mayúscula y luego puedes seguir poniendo mayúsculas, minúsculas y numeros, desde 10 a 115 digitos."}
                value={descripcion.value}
                onChange={(input)=>{ 
                    const descripcion= input.target.value
                    const descripcionValido = validarDescripcion(descripcion)
                    setDescripcion({value:descripcion, valid:descripcionValido})
                }}
            />

            <CssTextField required 
                fullWidth margin="normal" 
                placeholder="Usuário..." type="Usuario"
                error={usuario.valid === false}
                helperText={usuario.valid === false && "Este campo permite poner mayúsculas, minúsculas y numeros."}
                value={usuario.value}
                onChange={(input)=>{ 
                    const usuario= input.target.value
                    const usuarioValido = validarUsuario(usuario)
                    setUsuario({value:usuario, valid:usuarioValido})
                }}
            />

            <div className="botonContenedor">
                <div className="botonContenido">
                    <Button  variant="contained" 
                    type="submit">Guardar</Button> 
                    <Button  variant="outlined"  color="primary" type="reset"
                        onClick={handleFormReset}  >limpiar</Button>
                </div>
                <Link to="/NewCategorie">
                    <Button  
                        variant="outlined" color="secondary" size="large"
                        >Nueva Categoría</Button>  
                </Link>
            </div>
            
        </Box> 
    </Container>
}

export default NewVideo