import texto_logo from "../../assets/img/Helix_text.png"
import "../../assets/css/header.css"
import { Link } from "react-router-dom"


function Header() {

    return <header className="header">
        <Link to="/">
            <img src={texto_logo} 
            className="texto_logo" 
            alt="nombre logo"/>
        </Link>
        <Link to="/NewVideo">
            <button type="button" 
            className="btn_desktop">Nuevo Video</button>
        </Link>
    </header>
}

export default Header