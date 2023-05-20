export const validarTitulo = (titulo) =>{
    const regex = /(^[A-ZÁÉÍÓÚÑ][a-záéíóúñ\s\S]{1,24})$/
    return regex.test(titulo)
}

export const validarVideo = (video) =>{
    const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?([a-zA-Z0-9_-]{11})/
    return regex.test(video)
}

export const validarImgVideo = (imgVideo) =>{
    const regex = /^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/
    return regex.test(imgVideo)
}

export const validarDescripcion= (descripcion) =>{
    const regex = /(^[A-ZÁÉÍÓÚÑ][a-záéíóúñ\s\S]{5,400})$/
    return regex.test(descripcion)
}

export const validarUsuario = (usuario) =>{
    const regex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s.-_@&()|']{3,30}$/
    return regex.test(usuario)
    
}
