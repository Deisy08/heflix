import texto_logo from "../../assets/img/Helix_text.png"
import styled from "styled-components"
const Footer = () =>{

    const Contenedor = styled.footer`
        display: flex;
        align-items:center;
        flex-direction:column ;
        padding-top:10px;
        border-top: 2px solid #2A7AE4;
    `

    const ImgLogo = styled.img`
        height: 50px;
        width : 100px;
    `

    return <Contenedor >
        <ImgLogo src={texto_logo} alt="nombre logo"/>
        <p style={{marginBottom:"0.8rem"}}>Site made in #challengeAlways by TSG</p>
    </Contenedor>
}

export default Footer