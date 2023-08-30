const origenesPermitidos = require('./origenesPermitidos');

const opcionesCors = {
    origin: (origin, callback) => {
        if (origenesPermitidos.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
};

module.exports = opcionesCors;
