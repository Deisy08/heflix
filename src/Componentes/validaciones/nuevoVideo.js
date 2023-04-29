export const validarTitulo = (titulo) =>{
    const regex = /(^[A-Z][a-z][\w\W][\s\S]{2,25})$/
    return regex.test(titulo)
}

export const validarVideo = (video) =>{
    const regex = /^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/
    return regex.test(video)
}

export const validarImgVideo = (imgVideo) =>{
    const regex = /^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/
    return regex.test(imgVideo)
}

export const validarDescripcion= (descripcion) =>{
    const regex = /([A-Z][a-z][\w\W][\s\S]{5,115})$/
    return regex.test(descripcion)
}

export const validarUsuario = (usuario) =>{
    const regex = /^[a-zA-Z0-9][\w\W][\s\S]+$/
    return regex.test(usuario)
    
}
