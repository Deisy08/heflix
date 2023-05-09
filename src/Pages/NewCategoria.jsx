import { Container, Box, Button ,TextField} from "@mui/material";
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from "styled-components";
import loader from "../assets/img/loading.svg"
import { validarTitulo, validarUsuario, validarDescripcion } from "../Componentes/validaciones/nuevoVideo";
import { useNavigate } from 'react-router-dom';
import Tabla from "../Componentes/Tabla";

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
    },
    ".css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":{
        color:"#FFF",
        fontSize:"1rem",
        top:"-15px"
    },
    ".css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":{
        display:"none"
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

const NewCategoria = ({ addCategoria, fetchCategorias }) =>{
    const navigate = useNavigate();
   //useStates de mi formulario
    const [category,setCategory]= useState({
        value : "",
        valid:null
    })
    const [color,setColor]= useState({
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

    const manejarEnvio = (e) =>{
        e.preventDefault()
        const categoria = {
            categorias: category.value,
            colorFondoBorde: color.value ,
        };
        addCategoria(categoria); 
        console.log(category.value,color.value);
        console.log(category,color,descripcion,usuario);
        
        // Redirige a NewVideo con la nueva categoría
        navigate('/NewVideo', { state: { categoria } }); 

        fetch('http://localhost:3000/categorias', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                categoria: category.value,
                colorFondoBorde: color.value,
                descripcion: descripcion.value,
                usuario: usuario.value
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Datos guardados en db.json:', data)
            fetchCategorias()// Obtener la lista actualizada de categorías    
        })
        .catch(error => console.error(error))
    }
    // Generar el ID único
    const idUnico = uuidv4();
  
    const handleFormReset = () => {
        setCategory({value: ""});
        setColor({value: ""});
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
            id={idUnico}
        >
            <h1>Create new category</h1>

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
                fullWidth margin="normal" label="color" 
                type="color" 
                error={color.valid === false} 
                helperText={color.valid === false && "El nombre del título debe tener al comienzo una letra en mayúscula y de entre 5 y 15 caracteres."}
                value={color.value}
                onChange={(e)=>{ 
                    const color= e.target.value
                    setColor({value:color, valid:true})
                }}
            />
        
            <CssTextFieldTextarea required 
                placeholder="Describa porque agregar esta categoria..."
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

            <CssTextField  
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
}

export default NewCategoria
