import { Container, Box, Button, TextField, Autocomplete} from "@mui/material";
import { Link } from "react-router-dom"
import React, { useState, useEffect } from "react";
import { styled } from '@mui/system';
import { validarTitulo, validarVideo, validarImgVideo, validarUsuario, validarDescripcion } from "../Componentes/validaciones";
import Footer from "../Componentes/Footer";
import { buscar } from "../api/api";

const CssTextField = styled(TextField)(({ theme }) => ({
    
    
    '& .MuiOutlinedInput-root': {
      
      '&:hover fieldset': {
        borderColor: '#2A7AE4',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#2A7AE4',
      },
      '& .MuiInputBase-input': {
        color: 'white',
      },
      backgroundColor: '#53585D',
    },
}));
  


const CssTextFieldTextarea = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderBottom:"2px solid #2A7AE4",
        },
        "&.css-8ewcdo-MuiInputBase-root-MuiOutlinedInput-root" : {
            background: "#53585D",
        },
        ".css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input":{
            color:"#fff"
        }
    },
});

const btnContenedor = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "30px",
}
const btnContenido= {
    display: "flex",
    justifyContent: "space-around",
    paddingBottom: "30px",
    width: "100%",
}
const NewVideo = ({ addCategoria, location }) =>{
    
    const [categorias, setCategorias] = useState([])
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

    const [selectedCategory, setSelectedCategory] = useState("Grupo");
    const [isCategoryValid, setIsCategoryValid] = useState(true);

    useEffect(() => {
      buscar(`/categorias`, setCategorias)
    }, [])
    
    useEffect(() => {
        if (location?.state?.categoria) { // Si hay una nueva categoría en el estado de ubicación
          addCategoria(location.state.categoria); // Agrega la nueva categoría a la lista de categorías
          setCategorias([...categorias, location.state.categoria]); // Actualiza el estado de las categorías
        }
    }, [location, addCategoria, categorias]);

    const manejarEnvio = (e) =>{
        e.preventDefault()
        const confirmed = window.confirm('¿Estás seguro de que deseas guardar este elemento?');
        if (!confirmed) {
        return;
        }
        //console.log(titulo,video,imgVideo,descripcion,usuario,selectedCategory);
        
        fetch('https://646d54f79c677e232189ed4f.mockapi.io/api/cards', {
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

    const options = categorias.map((option) => {
        const firstLetter = option.categoria?.[0]?.toUpperCase() || '';
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

    return <><Container maxWidth="xl" style={{ marginTop: "50px", marginBottom: "50px"}}>
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
            style={{color:"white"}}
        >
            <h1 style={{textAlign:"center"}}>Create new video</h1>
            
            <CssTextField  required 
                fullWidth margin="normal" 
                placeholder="Title..." type="text"
                error={titulo.valid === false} 
                helperText={titulo.valid === false && "El título debe tener entre 2 y 25 letras(comienza con mayúscula)  y permitir mayúsculas, minúsculas, espacios, y la letra ñ."}
                value={titulo.value}
                onChange={(input)=>{ 
                    const titulo= input.target.value
                    const tituloValido = validarTitulo(titulo)
                    setTitulo({value:titulo, valid:tituloValido})
                }}
            />

            <CssTextField  required 
                fullWidth margin="normal"
                placeholder="Video link..." type="text"
                error={video.valid === false}
                helperText={video.valid === false && "Este campo es para la URL no es válido, asegurese que sea válido."}
                value={video.value}
                onChange={(input)=>{ 
                    const video= input.target.value
                    const videoValido = validarVideo(video)
                    setVideo({value:video, valid:videoValido})
                }}
            />

            <CssTextField required
                fullWidth margin="normal"
                placeholder="Video Image Link..." type="imgVideo"
                error={imgVideo.valid === false}
                helperText={imgVideo.valid === false && "El enlace de imagen no es válido, asegurece que su imagen sea válido."}
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
                    placeholder={"Choose a category..."} 
                    error={!isCategoryValid }
                    helperText={!isCategoryValid  && "Este campo no puede estar vacio, elija una categoría."}
                />}
                onChange={(event, value) => {
                    setSelectedCategory(value?.categoria || "");
                }}
            />
           
            <CssTextField required 
                placeholder="Description..."
                fullWidth margin="normal" 
                rows={4}
                multiline
                error={descripcion.valid === false}
                helperText={descripcion.valid === false && "La descripción debe comenzar con mayúscula y puede contener letras, espacios, tildes y la letra ñ(de 5 hasta 400 caracteres)."}
                value={descripcion.value}
                onChange={(input)=>{ 
                    const descripcion= input.target.value
                    const descripcionValido = validarDescripcion(descripcion)
                    setDescripcion({value:descripcion, valid:descripcionValido})
                }}
            />

            <CssTextField required 
                fullWidth margin="normal" 
                placeholder="User..." type="Usuario"
                error={usuario.valid === false}
                helperText={usuario.valid === false && "En el campo usuario puede comienza con mayúscula ,tildes y puede tener carecteres especiales(-_@&()|')."}
                value={usuario.value}
                onChange={(input)=>{ 
                    const usuario= input.target.value
                    const usuarioValido = validarUsuario(usuario)
                    setUsuario({value:usuario, valid:usuarioValido})
                }}
            />

            <div style={btnContenedor}>
                <div style={btnContenido}>
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
    <Footer/> </>
}

export default NewVideo