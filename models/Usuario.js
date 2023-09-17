const mongoose = require('mongoose');

const usuarioEsquema = new mongoose.Schema({
    nombreDeUsuario: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: [
        {
            type: String,
            default: 'Empleado',
        },
    ],
    activos: {
        type: Boolean,
        default: true,
    },
});

module.exports = mongoose.model('Usuario', usuarioEsquema);
