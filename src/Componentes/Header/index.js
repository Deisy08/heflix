import texto_logo from "../../assets/img/Helix_text.png"
import { Link } from "react-router-dom"
import styled from "styled-components"

const HeaderContenedor = styled.header`
    background-color: #000000E5;
    display: flex;
    justify-content: center;
    padding: 20px;
	border-bottom: 2px solid #2A7AE4;
	box-shadow: 0 0 10px #2A7AE4;
    @media (min-width: 768px) {
       justify-content: space-between;
	   padding: 25px 40.5px;
	   align-items: center;
    }
`

const Logo = styled.img`
    width: 200px;
	height: 50px;
	cursor: pointer;
    @media (min-width: 768px) {
		width: 255px;
		height: 40px;
	}
`

const Enlace = styled.button`
    background: none;
	color: #FFFFFF;
	padding: 10px 15px;
	font-weight: 600;
	font-size: 21px;
    font-style: italic;
	font-family: 'Source Sans Pro', sans-serif;
	text-align: center;
	border: 1px solid #F5F5F5;
	border-radius: 5px;
	display: none;
	//cursor: pointer;
    &:hover {
        box-shadow: 0 0 20px #2A7AE4;
        border-color: #2A7AE4;
        font-size: 21.5px;
        background: #2A7AE4;
    }
    @media (min-width: 768px) {
		display: block;
	}
`

const a = {
    color: "none",
    textDecoration:"none"
}

function Header() {

    return <HeaderContenedor >
        <Link to="/">
            <Logo src={texto_logo} 
            alt="nombre logo"/>
        </Link>
        <Link to="/NewVideo" style={a}>
            <Enlace type="button" >Nuevo Video</Enlace>
        </Link>
    </HeaderContenedor>
}

export default Header