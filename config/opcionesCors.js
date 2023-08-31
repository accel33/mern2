const origenesPermitidos = require('./origenesPermitidos');

// CORS, Recursos Compartidos de Origen Multiples
const opcionesCors = {
    origin: (origen, funcionParaLlamarLuego) => {
        if (origenesPermitidos.indexOf(origen) !== -1 || !origen) {
            funcionParaLlamarLuego(null, true);
        } else {
            funcionParaLlamarLuego(new Error('No permitido por CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
};

module.exports = opcionesCors;
