const { format } = require('date-fns');
const { v4: uuid } = require('uuid');
const fs = require('fs');
const fsPromesas = require('fs').promises;
const path = require('path');

const registrarEventos = async (mensaje, nombreDeArchivo) => {
    const fecha = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;

    // Dentro del mensaje vamos a poner: Fecha, ID, Mensaje
    const mensajeDeRegistro = `${fecha}\t${uuid()}\t${mensaje}\n`;

    const carpetaDeRegistros = path.join(__dirname, '..', 'logs');
    const archivoDeRegistro = path.join(carpetaDeRegistros, nombreDeArchivo);

    try {
        if (!fs.existsSync(carpetaDeRegistros)) {
            await fsPromesas.mkdir(carpetaDeRegistros);
        } // Si no existe la ruta, creamos la carpeta
        await fsPromesas.appendFile(archivoDeRegistro, mensajeDeRegistro); // Luego de tener carpeta, creamos
    } catch (err) {
        console.log(err);
    }
};

//TODO buscar solo loguear solicitudes especificas, buscar minimizar la cantidad de logs en el futuro
const logger = (req, res, next) => {
    const mensaje = `${req.method}\t${req.url}\t${req.headers.origin}`;

    registrarEventos(mensaje, 'reqLog.log');
    next();
};

module.exports = { registrarEventos, logger };
