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
        const confirmed = window.confirm('Are you sure you want to keep this element?');
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
                helperText={titulo.valid === false && "The title must be between 2 and 25 letters (starting with capital letter) and you can write capital letters, lowercase letters, spaces, and letter ñ."}
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
                helperText={video.valid === false && "This field is for the URL not valid, make sure it is valid."}
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
                helperText={imgVideo.valid === false && "The image link is not valid, make sure your image is valid."}
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
                    helperText={!isCategoryValid  && "This field cannot be empty, choose a category."}
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
                helperText={descripcion.valid === false && "The description should begin with a capital letter and may contain letters, spaces, tildes and letter (from 5 to 400 characters)."}
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
                helperText={usuario.valid === false && "In the user field I was able to start with capital letter, tildes and I was able to have special characters (-_@&()|')."}
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
                    type="submit">Save</Button> 
                    <Button  variant="outlined"  color="primary" type="reset"
                        onClick={handleFormReset}  >Clear</Button>
                </div>
                <Link to="/NewCategorie">
                    <Button  
                        variant="outlined" color="secondary" size="large"
                    >New Category</Button>  
                </Link>
            </div>
            
        </Box> 
    </Container>
    <Footer/> </>
}

export default NewVideo