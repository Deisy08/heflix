import { Link } from "react-router-dom"
import img_m1 from "../../assets/img/banner_m1.jpg"
import img_m2 from "../../assets/img/banner_m2.jpg"
import img_m3 from "../../assets/img/banner_m3.jpg"
import img_m4 from "../../assets/img/banner_m4.jpg"
import img_t1 from "../../assets/img/banner3.jpg"
import img_t2 from "../../assets/img/banner6.jpg"
import img_t3 from "../../assets/img/banner5.jpg"
import img_t4 from "../../assets/img/banner4.jpg"
import img_t5 from "../../assets/img/banner2.jpg"
import styled, { keyframes } from "styled-components"

const bannerM = keyframes`
    0%,20%{ background-image: url(${img_m1})}
    25%,45%{ background-image: url(${img_m2})}
    50%,70%{background-image: url(${img_m3})}
    75%,100%{background-image: url(${img_m4})}
`
const bannerT = keyframes`
    0%,20%{ background-image: url(${img_t1})}
    25%,45%{ background-image: url(${img_t2});}
    50%,70%{background-image: url(${img_t3})}
    75%,100%{background-image: url(${img_t4});}
`

const bannerD = keyframes`
    0%,20%{ background-image: url(${img_t5})}
    25%,45%{ background-image: url(${img_t3});}
    50%,70%{background-image: url(${img_t2})}
    75%,100%{background-image: url(${img_t4});}
`

const BannerContenedor = styled.section`
    position: relative;
    widows: 100%;
    height: calc(60vh - 50px);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    animation: ${bannerM} 20s infinite linear alternate;
   
    
    @media (min-width: 768px) {
        background-size: cover;
        height: 300px;
        animation: ${bannerT} 20s infinite linear alternate;
    }

    @media (min-width: 1024px) {
        background-size: cover;
        height: calc(100vh - 500px);
        animation: ${bannerD} 20s infinite linear alternate;
        
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