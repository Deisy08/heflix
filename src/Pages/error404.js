
import page404 from "../assets/img/page404.jpg"
import logo_github from "../assets/img/github.png"
import logo_linkedin from "../assets/img/linkedin.png"
import styled from "styled-components"

const Contenedor = styled.section`
    padding: 50px;
`
const ContenidoTexto = styled.section`
    display: flex;
    align-items: center;
    flex-direction: column;
    @media (min-width: 768px) {
        flex-direction: row;
        padding-bottom: 50px;
        justify-content: space-around;
    }
`
const ContenidoEnlace = styled.section`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-evenly;
    
    padding: 20px 0;
    background: #393e44;
    
`
const Div404 = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    @media (min-width: 768px) {
        padding-left: 10px;
    }
`
const TristeImg = styled.img`
    width: 60%;
    font-family: fantasy;
    margin-bottom: 25px;
    border-radius: 50px;
    @media (min-width: 768px) {
        padding-right: 10px;
        margin-bottom: 0;
    }
    @media (min-width: 1024px) {
        width: 45%;
    }
    @media (min-width: 1324px) {
        width: 30%;
    }
`
const Sombra = styled.div`
    height: 2px;
    border-top: 2px solid #2A7AE4;
    box-shadow: 0 0 10px  #2A7AE4;
`
const GitHub = styled.img`
    width: 30px;
    margin-right: 5px;
    display: inline;
`
const A = styled.a`
    text-align: center;
    text-decoration: none;
    color: #f8f8f8;
    display: inline;
`
const H1 = styled.h1`
    font-weight: 400;
    text-align: center;
    font-size: 100px;
    color: #E53935;
    font-family: 'Smokum', cursive;
`
const H2 = styled.h2`
    color: #3bbcd1;
    padding: 0 20px;
    text-align: center;
`
const H6 = styled.p`
    color: #c9cdd1;
    padding: 0 15px;
    text-align: center;
`
const Error404 = () =>{
    return <>
        <Contenedor>
            <ContenidoTexto>
                <TristeImg src={page404} alt="logo-404"/>
                <Div404>
                  <H1>404 Error</H1>
                  <H2>Woww Woww... No se ponga triste que yo también voy a llorar</H2>
                  <H6>Esta página no existe o no se encuentra e incluso puede estar en esta en construcción</H6>
                </Div404>
                
            </ContenidoTexto>
        </Contenedor>
        <Sombra></Sombra>
        <ContenidoEnlace>
            <A href="https://github.com/Deisy08"><GitHub src={logo_github} className="logo" alt="logo_github"/>GitHub</A>
            <A href="https://www.linkedin.com/in/trujillosanchezdeisy23/"><img className="logo" src={logo_linkedin} alt="logo_linkedin"/>LinkedIn</A>
        </ContenidoEnlace>
        
    </>
}

export default Error404