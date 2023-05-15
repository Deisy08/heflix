import { Link } from "react-router-dom"
import styled from "styled-components"

const BannerContenedor = styled.section`
    position: relative;
    widows: 100%;
    height: calc(60vh - 50px);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    animation: banner 20s infinite linear alternate;
    @keyframes banner {
        0%,20%{
            background-image: url(../img/banner_m1.jpg);
        }
        25%,45%{
        background-image: url(../img/banner_m2.jpg);
        }
        50%,70%{
            background-image: url(../img/banner_m3.jpg);
        }
        75%,100%{
            background-image: url(../img/banner_m4.jpg);
        }
    }
    
    @media (min-width: 768px) {
        background-size: cover;
        height: calc(50vh - 190px);
        
        @keyframes banner {
            0%,20%{
                background-image: url(../img/banner3.jpg);
            }
            25%,45%{
            background-image: url(../img/banner6.jpg);
            }
            50%,70%{
                background-image: url(../img/banner5.jpg);
            }
            75%,100%{
                background-image: url(../img/banner4.jpg);
            }
        }
    }

    @media (min-width: 1024px) {
        background-size: cover;
        height: calc(100vh - 500px);
        @keyframes banner {
            0%,20%{
                background-image: url(../img/banner2.jpg);
            }
            25%,40%{
            background-image: url(../img/banner5.jpg);
            }
            45%,65%{
                background-image: url(../img/banner5.jpg);
            }
            70%,81%{
                background-image: url(../img/banner6.jpg);
            }
            84%,100%{
                background-image: url(../img/banner4.jpg);
            }
        }
    }
`

const Contenedor = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    
`

const Contenido = styled.div`
    margin: 0;
    padding: 0;
    padding-bottom: 50px;
    width: 100%;
    height: 100%;
    color: white;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    
    @media (min-width: 768px) {
        text-align: left;
        flex-direction: column;
        justify-content: flex-end;
        align-items: flex-start;
        padding-bottom: 10px;
    }

`

const H1 = styled(Contenido)`
    margin: 20px;
    font-size: 30px;
    
    @media (min-width: 768px) {
        margin-bottom: 0;
        width: 400px;
    }
`
const P = styled(Contenido)`
    margin: 20px;
    padding: 0 10px;
    font-size: 20px;
    margin-bottom: 30px;
    @media (min-width: 768px) {
        width: 400px;
    }
    @media (min-width: 1024px) {
        width: 45%;
    }
`

const Enlace = styled.button`
    color: #FFF;
    background: none;
    padding: 9px 20px;
    text-transform: uppercase;
    border: 1px solid #FFF;
    transition: all .3s ease-in-out;
    width: 150px;
    text-align: center;
    border-radius: 50px;
    &:hover{
        background-color: #2A7AE4;
        border-color: #2A7AE4;
        font-weight: bold;
        box-shadow: 0 0 15px #2A7AE4;
    }
    @media (min-width: 768px) {
        display: none;
    }
`
function Banner() {
    return <BannerContenedor>
        <Contenedor>
            <Contenido>
                <H1>K-Pop</H1>
                <P>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</P>
                <Link to="/NewVideo">
                    <Enlace type="button" className="button none">Ver</Enlace>
                </Link>
            </Contenido>
        </Contenedor>
        
    </BannerContenedor>
}

export default Banner