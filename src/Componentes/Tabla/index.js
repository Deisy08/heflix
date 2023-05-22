import styled from "styled-components"
import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter, } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { buscar } from "../../api/api";

const TableContenedor = styled.table`
    width: 100%;
    border-collapse: collapse;
    border: 4px solid #2A7AE4;
    border-radius: 5px;
    @media (max-width: 768px){
      display: none;  
    }
`
const CabezaTabla = styled.thead`
    font-size: 20px;
    th {
        //border-right: 2px solid #2A7AE4;
        border: 4px inset #2A7AE4;
        border-collapse: collapse;
        padding: 8px;
        font-weight: 400;
    }
`
const CuerpoTabla = styled.tbody`
    font-size: 20px;
    
    td {
        padding: 8px;
        font-weight: 300;
        border:  4px inset rgba(0, 0, 0, 0.9);
    }
`
const Editar = styled.td`
    cursor: pointer;
`
const Eliminar = styled.td`
    cursor: pointer;
`

const Tabla = () => {

    const [btnEditar, setBtnEditar] = useState(null);
    const [btnEliminar, setBtnEliminar] = useState(null);
    //elementos de mi modal
	const [nameCategory,setNameCategory]= useState("")
    const [color,setColor]= useState("")
    const [descripcion,setDescripcion]= useState("")
    const [categorias, setcategorias] = useState([])//api enlace


    useEffect(() => {
        buscar(`/categorias`, setcategorias)
        .then(response => response.json())
        .catch(error => console.error(error));
    }, []);

   //visibilidad de mi modal
    const [show, setShow] = useState(false);
    const handleClose = () =>{
		setShow(false);
	};

    const handleShow = (registro) => {
		setBtnEditar(registro.id);
		setNameCategory(registro.categoria);
		setDescripcion(registro.descripcion);
		setColor(registro.colorFondoBorde);
		setShow(true);
  	};

    const editForm = () =>{
        // Agregar el ID del registro seleccionado a la URL del endpoint
        const url = `http://localhost:5000/categorias/${btnEditar}`;
        const confirmed = window.confirm('¿Estás seguro de que deseas editar este elemento?');
        if (!confirmed) {
            setShow(false)
        return;
        }
        //console.log(btnEditar);
        // Enviar solicitud PUT o PATCH a la API con los datos actualizados del registro seleccionado.
		   fetch(url, {
			   method: 'PUT', // o PATCH
			   headers: {
				   'Content-Type': 'application/json'
			   },
			   body: JSON.stringify({
				   categoria: nameCategory,// Valor actualizado 
				   descripcion: descripcion,
				   colorFondoBorde: color
			   })
		   })
		   .then(response => {
                if (!response.ok) {
                    throw new Error('Error al actualizar la categoría');
                }
                return response.json();
            })
		   .then(data => {
			   // Actualizar el estado de los datos con la respuesta de la API.
               console.log('Datos actualizados:', data);
			   setcategorias(data);
			   //setBtnEditar(null);
			   setShow(false);
		   })
		   .catch(error => console.error(error));
        window.location.href = '/';
    }

    const eliminar = async (item) =>{
        setBtnEliminar(item.id);
        const confirmed = window.confirm('¿Estás seguro de que deseas eliminar este elemento?');
        if (!confirmed) {
            return; 
        }
        const url = `http://localhost:5000/categorias/${item.id}`;
        //console.log(url);
        await fetch(url,{
            method: "DELETE",
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log('Datos actualizados:', data);
            setcategorias(data);
            setBtnEliminar(null);
        })
        .catch(err => console.log(err)) 
        window.location.href = '/';
    }
    //validaciones
	const isValidName = /^[A-Z][a-zA-Z][\w\W][\s\S]{2,25}$/.test(nameCategory); // Expresión regular que verifica si el primer caracter es mayúscula y los siguientes son letras.
    const isValidDescription = /([A-Z][a-z][\w\W][\s\S]{5,115})$/.test(descripcion);
    const isValidColor = /^#[0-9a-fA-F]{6}$/.test(color)

    return <>
        <TableContenedor>
            <CabezaTabla>
                <tr>
                <th style={{width:"15%"}}>Nombre</th>
                <th style={{width:"70%"}}>Descripción</th>
                <th>Editar</th>
                <th>Remover</th>
                </tr>
            </CabezaTabla>
            <CuerpoTabla>
                {categorias.length > 0 && categorias.map((item) => (
                    <tr key={item.id}>
                        <td>{item.categoria}</td>
                        <td>{item.descripcion}</td>
                        <Editar onClick={() => handleShow(item)}>Editar</Editar>
                        <Eliminar onClick={() => eliminar(item)} >Remover</Eliminar>
                    </tr>
                ))}
            </CuerpoTabla>
        </TableContenedor>
        <Modal 
            size="lg"
            show={show} 
            dialogClassName="modal-90w"
            onHide={handleClose}
            centered
            style={{color:"black"}}
        >
            <ModalHeader closeButton>
                <Modal.Title>Editar Registro</Modal.Title>
            </ModalHeader>
            <ModalBody>
            <FormGroup>
				<label>Nombre:</label>
				<input
					className={`form-control ${nameCategory !== null ? (isValidName ? 'is-valid' : 'is-invalid') : ''}`}
					type="text"
					value={nameCategory}
					onChange={(e)=>{ 
						setNameCategory(e.target.value)
					}}
				/>
				{nameCategory !== null && !isValidName && <div className="invalid-feedback">El nombre de esta categoria debe comenzar en mayúscula.</div>}
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
						setDescripcion(e.target.value)
					}}
				/>
				{descripcion !== null && !isValidDescription && <div className="invalid-feedback">La descripción debe comenzar en mayúscula.</div>}
			</FormGroup>
            
            <FormGroup>
              <label>
                Color: 
              </label>
              <input
                className={`form-control ${color !== null ? (isValidColor ? 'is-valid' : 'is-invalid') : ''}`}
                type="color"
				value={color}
                onChange={(e)=>{ 
                    setColor(e.target.value)
                }}
              />
              {color !== null && !isValidColor && <div className="invalid-feedback">Por favor, seleccione un código de color hexadecimal válido.</div>}
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={editForm}
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

export default Tabla