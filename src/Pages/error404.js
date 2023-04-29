import "../assets/css/error404.css"
import page404 from "../assets/img/page404.jpg"
import logo_github from "../assets/img/github.png"
import logo_linkedin from "../assets/img/linkedin.png"
const Error404 = () =>{
    return <>
        <section className="contenedor">
            <section className="contenido1">
                <img  className="img_404"src={page404} alt="logo-404"/>
                <div className="div404">
                  <p className="h1_noEncontrado">404 Error</p>
                  <h1 className="h1_noEncontrado">Woww... No se ponga triste</h1>
                  <p className="p_noEncontrado">Esta página no existe o no se encuentra e incluso puede estar en esta en construccion</p>
                </div>
                
            </section>
        </section>
        <div className="sombra"></div>
        <section className="contenido2">
            <a href="https://github.com/Deisy08"><img src={logo_github} className="logo" alt="logo_github"/>GitHub</a>
            <a href="https://www.linkedin.com/in/trujillosanchezdeisy23/"><img className="logo" src={logo_linkedin} alt="logo_linkedin"/>LinkedIn</a>
        </section>
        
    </>
}

export default Error404