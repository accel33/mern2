const fs = require('fs');
const path = require('path');
const rutaDeArchivo = path.resolve(`../miDireccion/miFile.md`)

// Paresea el Buffer a un string
function llamarLuego(data) {
    return data.toString()
}

function llamaLuegoLeeFile(err, data) {
    if (err) return rechazar(err);
    return resolver(data);
};

function resolverRechazar(resolver, rechazar) {
    fs.readFile(rutaDeArchivo, llamaLuegoLeeFile)
}

const promesa = new Promise(resolverRechazar)

function promesa(rutaDeArchivo) {
    return promesa
}

// Transformo la funcion en una promesa
const promesaLeerArchivo = (rutaDeArchivo) => {
    return new Promise((resolver, rechazar) => {
        fs.readFile(rutaDeArchivo, (err, data) => {
            if (err) return rechazar(err)
            return resolver(llamarLuego(data))
        })
    })
}
