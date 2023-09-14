const origenesPermitidos = require('./origenesPermitidos');

// CORS, Recursos Compartidos de Origen Multiples
let origenNoEncontrado = -1
const opcionesCors = {
    origin: (origen, funcionParaLlamarLuego) => {
        if (origenesPermitidos.indexOf(origen) !== origenNoEncontrado || !origen) {
            // Origen es falso es un request de REST o algun lugar sin origen
            funcionParaLlamarLuego(null, true);
        } else {
            funcionParaLlamarLuego(new Error('No permitido por CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
};

// const opcionesCores = {
//     origin: function(origen, funcionParaLlamarLuego){
//         // 
//         if (['abc.com','zxc.com'].indexOf(origen))
//     }
// }

module.exports = opcionesCors;
