import React, {useState} from 'react'
import ReactPlayer from "react-player/youtube";
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
import { Typewriter } from 'react-simple-typewriter'

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
    height: 560px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    animation: ${bannerM} 20s infinite linear alternate;
   
    
    @media (min-width: 768px) {
        background-size: cover;
        height: 310px;
        animation: ${bannerT} 20s infinite linear alternate;
    }

    @media (min-width: 1024px) {
        background-size: cover;
        height: calc(100vh - 400px);
        animation: ${bannerD} 20s infinite linear alternate;
    }
    @media (min-width: 1424px) {
        background-size: cover;
        height: calc(100vh - 350px);
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
        flex-direction: row;
        align-items: flex-end;
        justify-content: space-between;
        padding-bottom: 0;
    }

`
const H1 = styled(Contenido)`
    margin: 20px;
    color: #FFF;
    font-weight: bolder;
    font-size: 45px;
    display: inline;
    @media (min-width: 768px) {
        margin-bottom: 0;
    }
`
const P = styled.p`
    margin: 20px 2%;
    font-size: 20px;
    text-align: center;
    @media (min-width: 768px) {
        text-align: start;
        font-size: 15px;
        margin: 20px 4%;   
    }
    @media (min-width: 1024px) {
        font-size: 21.5px;
    }
    @media (min-width: 1424px) {
        margin: 20px 4% 20px 2%;
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
const VideoC = styled.div`
        
        display: block;
        width:19.5rem;
        @media (min-width: 800px){
            width: 20rem;
            height: calc(90vh - 700px)
        }
        @media (min-width: 900px){
            width: 25rem;
            height: calc(90vh - 650px)
        }
        @media (min-width: 1024px){
            width: 30rem;

            height: calc(90vh - 620px)
        }
        @media (min-width: 1424px){
            width: 560px;
        }
` 
const VideoMovilC = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 130px;
`

   
function Banner() {

    const [showVideo, setShowVideo] = useState(false);

    const handleVerClick = () => {
      setShowVideo(true);
    };
  
    const handleCerrarClick = () => {
      setShowVideo(false);
    };

    const VideoT = styled.div`
        display: none;
        padding:0 30px 20px 0;
        @media (min-width: 768px){
            display: block;

        }
    `

    const VideoPlayerT = () => {
        return (
        <VideoC>
            <ReactPlayer 
                url="https://www.youtube.com/embed/x0sASwK5t2M?enablejsapi=1"
                controls
                loop
                muted
                enablejsapi="true"
                playing={true}
                width="auto"
                height="100%"
                config={{
                    youtube: {
                    playerVars: { showinfo: 1 }
                    }
                }}
            />
        </VideoC>
        
        );
    };

    
    const VideoPlayer = ({ onClose }) => {
        const handleMediaQueryChange = (mediaQuery) => {
        if (mediaQuery.matches) {
            onClose();
        }
        };
    
        // Verificar el tamaño de la pantalla usando una media query
        const mediaQuery = window.matchMedia('(min-width: 768px)');
        mediaQuery.addListener(handleMediaQueryChange);
    
        // Cerrar el video si se cumple la media query en el montaje inicial
        if (mediaQuery.matches) {
        onClose();
        }
    
        return (
        <VideoMovilC >
            <ReactPlayer
            url="https://www.youtube.com/watch?v=x0sASwK5t2M"
            controls
            width="calc(80vh - 300px)"
            height="300px"
            />
            <Enlace  style={{marginTop:"25px"}} onClick={onClose}>Close</Enlace>
        </VideoMovilC>
        );
    };

    return <BannerContenedor>
        <Contenedor>
            {showVideo ? (
                <VideoPlayer onClose={handleCerrarClick} />
                ) : (
                <Contenido>
                    <div>
                    <H1>K-POP</H1>
                    <P>
                    K-pop, It is characterized by a wide range of musical styles, including{' '}
                        <span style={{ color: '#ce4646', fontWeight: 'bold' }}>
                        <Typewriter
                            words={['Pop', 'Rap', 'Rock', 'R&B', 'Hip Hop','Electronic']}
                            loop
                            cursor
                            cursorStyle='<'
                            typeSpeed={120}
                            deleteSpeed={50}
                        />
                        </span>{' '}
                        and more. K-pop typically features a combination of catchy melodies, synchronized dance routines, stylish fashion, and visually appealing music videos.
                    </P>
                    <Enlace type="button" onClick={handleVerClick}>
                    click here
                    </Enlace>
                    </div>
                    <VideoT><VideoPlayerT /></VideoT>
                </Contenido>
            )}
        </Contenedor>
        
    </BannerContenedor>
}

export default Banner