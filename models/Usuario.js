const mongoose = require('mongoose')

const usuarioEsquema = new mongoose.Schema({
    username: {
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
    active: {
        type: Boolean,
        default: true,
    },
})

module.exports = mongoose.model('Usuario', usuarioEsquema)
