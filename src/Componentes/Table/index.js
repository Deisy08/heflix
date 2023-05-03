import styled from "styled-components"
import { useState, useEffect } from 'react';

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

const Table = () => {
    
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/categorias')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error));
    }, []);

    return <TableContenedor>
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
                        <td>Editar</td>
                        <td>Remover</td>
                    </tr>
                ))}
            </CuerpoTabla>
        </TableContenedor>
}

export default Table