import { Link } from "react-router-dom"
import "../../assets/css/banner.css"
function Banner() {
    return <section className="Banner">
        <div className="capa">
            <div className="contenido">
                <h1>K-Pop</h1>
                <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                <Link to="/NewVideo">
                    <button type="button" className="button none">Ver</button>
                </Link>
            </div>
        </div>
        
    </section>
}

export default Banner