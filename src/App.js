import GlobalStyle from "./GlobalStyle";
import Header from "./Componentes/Header"
import Home from "./Pages/Home";
import NewCategoria from "./Pages/NewCategoria";
import NewVideo from "./Pages/NewVideo";
import Error404 from "./Pages/error404";
import Footer from "./Componentes/Footer";

import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {

  const location = window.localStorage.pathname;
  console.log(location)

  const grupoCategoria = [
    { 
        categorias: 'Grupo', 
        colorFondoBorde : "#6BD1FF"
    },
    { 
        categorias: 'Solista',
        colorFondoBorde : "#FF8C2A"
    }
  ];

  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path='/' element={<Home card={grupoCategoria}/>} />
        <Route path='/NewCategorie' element={<NewCategoria card={grupoCategoria} />} />
        <Route path='/NewVideo' element={<NewVideo card={grupoCategoria} />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
