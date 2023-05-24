import axios from "axios";

export const api = axios.create({
    baseURL: "https://646d54f79c677e232189ed4f.mockapi.io/api"
});

export const buscar = async (url, setData) => {
    const respuesta = await api.get(url);
    
    console.log(respuesta);
    setData(respuesta.data);
};
