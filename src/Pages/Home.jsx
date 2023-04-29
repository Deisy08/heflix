
import Banner from "../Componentes/Banner";
import Carrusel from "../Componentes/Carrusel/Carrusel";


function Home(props) {

  
  
    return <>
        
        <Banner />
        <Carrusel card={props.card} />
  </>
}

export default Home