import { Container, Box, Button ,TextField} from "@mui/material";
import React, { useState } from 'react';
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
    const [descripcion,setDescripcion]= useState({value : "Infantil",valid:null})

    const manejarEnvio = (e) =>{
        e.preventDefault()
        const confirmed = window.confirm('Are you sure you want to add a new category?');
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
        >
            <h1 style={{textAlign:"center"}}>Create new category</h1>

            <CssTextField  required 
                fullWidth margin="normal" 
                placeholder="Category..." type="text"
                error={category.valid === false} 
                helperText={category.valid === false && "Type the name of the new category which should initially have a capital letter and between 5 and 15 characters."}
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
                placeholder="Describe why add this category..."
                fullWidth margin="normal" 
                rows={4}
                multiline
                error={descripcion.valid === false}
                helperText={descripcion.valid === false && "The description should begin with a capital letter and may contain letters, spaces, tildes and letter ñ."}
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
                    type="submit" >Save</Button> 
                    
                    <Button  variant="outlined"  color="primary" type="reset"
                    onClick={handleFormReset}  >Clear</Button>
                </div>
            </div>
            <Tabla />
        </Box> 
        
    </Container>
    <Footer />
    </>
}

export default NewCategoria
