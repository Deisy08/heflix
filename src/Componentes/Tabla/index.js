import styled from "styled-components"
import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter, } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
const TableContenedor = styled.table`
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
    
    const [data, setData] = useState([]);
    
    useEffect(() => {
        fetch('http://localhost:3000/categorias')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error));
    }, []);

   //visibilidad de mi modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const eliminar = () =>{
        let opcion = window.confirm("Realmente lo desea eliminar")
        console.log("eliminar elemento")
        return opcion
    } 

    return <>
        <TableContenedor>
            <CabezaTabla>
                <tr>
                <th style={{width:"15%"}}>Nombre</th>
                <th style={{width:"75%"}}>Descripción</th>
                <th>Editar</th>
                <th>Remover</th>
                </tr>
            </CabezaTabla>
            <CuerpoTabla>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.categoria}</td>
                        <td>{item.descripcion}</td>
                        <Editar onClick={handleShow}>Editar</Editar>
                        <Eliminar onClick={eliminar} >Remover</Eliminar>
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
              <label>
               Nombre:
              </label>
            
              <input
                className="form-control"
                type="text"
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Descripción: 
              </label>
              <input
                className="form-control"
                type="text"
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Color: 
              </label>
              <input
                className="form-control"
                type="color"
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={handleClose}
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