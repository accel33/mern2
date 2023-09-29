const { registrarEventos } = require('./registrador')

const manejadorDeErrores = (error, solicitud, respuesta, siguiente) => {
    const { method, url, headers } = solicitud
    const { name, message } = error
    const mensaje = `${name}\t${message}\t${method}\t${url}\t${headers.origin}`

    registrarEventos(mensaje, 'errorRegistro.log')
    console.log(error.stack)

    const status = respuesta.statusCode ? respuesta.statusCode : 500
    respuesta.status(status)
    respuesta.json({ message: error.message })
    siguiente()
}

module.exports = manejadorDeErrores
