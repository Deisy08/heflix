import styled from "styled-components"


const Enlace = (props) => {
    const Btn = styled.button`
    background: none;
	color: #fff;
	padding: 10px 15px;
	font-weight: 600;
	font-size: 21px;
    font-style: italic;
	font-family: 'Source Sans Pro', sans-serif;
	text-align: center;
	border: 1px solid #F5F5F5;
	border-radius: 5px;
	display: none;
	//cursor: pointer;
    &:hover {
        box-shadow: 0 0 20px #2A7AE4;
        border-color: #2A7AE4;
        font-size: 21.5px;
        background: #2A7AE4;
    }
    @media (min-width: 768px) {
		display: block;
	}
    `

    return <Btn type="button"  >{props.children}</Btn> 
}
export default Enlace