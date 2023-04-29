import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
  margin: 0;
  padding: 0;
  text-decoration: none;
  
  }
  body {
    background: rgba(0, 0, 0, 0.9);
    color: white;
  }
`;

export default GlobalStyle;
