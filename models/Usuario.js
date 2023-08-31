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
            required: true,
        },
    ],
    activos: {
        type: Boolean,
        required: true,
    },
});

module.exports = mongoose.Model('Usuario', usuarioEsquema);
