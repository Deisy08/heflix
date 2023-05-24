import { Container, Box, Button ,TextField} from "@mui/material";
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from "styled-components";
import loader from "../assets/img/loading.svg"
import { validarTitulo, validarDescripcion } from "../Componentes/validaciones";
import { useNavigate } from 'react-router-dom';
import Tabla from "../Componentes/Tabla";
import Footer from "../Componentes/Footer";

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

const espContenedor={
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "30px",
}
const btnContenido= {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
}
const NewCategoria = ({ addCategoria, fetchCategorias, url}) =>{
    const navigate = useNavigate();
   //useStates de mi formulario
    const [category,setCategory]= useState({value : "",valid:null})
    const [color,setColor]= useState("#2a7ae4")
    const [descripcion,setDescripcion]= useState({value : "",valid:null})

    const manejarEnvio = (e) =>{
        e.preventDefault()
        const confirmed = window.confirm('¿Estás seguro de que deseas agregar una nueva categoria?');
        if (!confirmed) {
        return;
        }
        const categoria = {
            categorias: category.value,
            colorFondoBorde: color.value ,
        };
        addCategoria(categoria); 
        //console.log(category.value,color.value);
        
        // Redirige a NewVideo con la nueva categoría
        navigate('/NewVideo', { state: { categoria } }); 

        fetch('https://646d54f79c677e232189ed4f.mockapi.io/api/categorias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                categoria: category.value,
                colorFondoBorde: color.value,
                descripcion: descripcion.value,
            })
        })
        .then(response => response.json())
        .then(data => {
            //console.log('Datos guardados en db.json:', data)
            fetchCategorias()// Obtener la lista actualizada de categorías    
        })
        .catch(error => console.error(error))
    }
    // Generar el ID único
    const idUnico = uuidv4();
  
    const handleFormReset = () => {
        setCategory({value: ""});
        setColor({value: ""});
        setDescripcion({value: ""});
    };
    const isValidColor = /^#[0-9a-fA-F]{6}$/.test(color)

    

    return <><Container maxWidth="xl" style={{ marginTop: "50px", marginBottom: "40px"}}>
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
            id={idUnico}
        >
            <h1 style={{textAlign:"center"}}>Create new category</h1>

            <CssTextField  required 
                fullWidth margin="normal" 
                placeholder="Categoria..." type="text"
                error={category.valid === false} 
                helperText={category.valid === false && "Escribe el nombre de la nueva categoria la cual debe tener al comienzo una letra en mayúscula y de entre 5 y 15 caracteres."}
                value={category.value}
                onChange={(e)=>{ 
                    const category= e.target.value
                    const categoryValido = validarTitulo(category)
                    setCategory({value:category, valid:categoryValido})
                }}
            />

            <CssTextField  required 
                fullWidth margin="normal" 
                type="color" 
                error={!isValidColor} 
                helperText={
                    isValidColor === false
                      && "Elige un color válido"}
                  
                value={color}
                onChange={(e)=>{ 
                    setColor(e.target.value)
                }}
            />
        
            <CssTextField required 
                placeholder="Describa porque agregar esta categoria..."
                fullWidth margin="normal" 
                rows={4}
                multiline
                error={descripcion.valid === false}
                helperText={descripcion.valid === false && "La descripción debe comenzar con mayúscula y puede contener letras, espacios, tildes y la letra ñ."}
                value={descripcion.value}
                onChange={(input)=>{ 
                    const descripcion= input.target.value
                    const descripcionValido = validarDescripcion(descripcion)
                    setDescripcion({value:descripcion, valid:descripcionValido})
                }}
            />

            <div style={espContenedor}>
                <div style={btnContenido}>
                    <Button  variant="contained" 
                    type="submit" >Guardar</Button> 
                    
                    <Button  variant="outlined"  color="primary" type="reset"
                        onClick={handleFormReset}  >limpiar</Button>
                </div>
                <div id="contact-form-loader" style={{display:"none"}}>
                    <img src={loader} alt="loading"/>
                </div>
            </div>
            <Tabla />
        </Box> 
        
    </Container>
    <Footer />
    </>
}

export default NewCategoria
