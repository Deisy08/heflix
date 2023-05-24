import texto_logo from "../../assets/img/Helix_text.png"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Enlace from "../Boton"

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
            <Enlace color={"#FFF"}>add video</Enlace>
        </Link>
    </HeaderContenedor>
}

export default Header