const mongoose = require('mongoose')
const AutoIncremento = require('mongoose-sequence')(mongoose)

const notaEsquema = new mongoose.Schema(
    {
        user: {
            //Hacemos referencia al usuario, porque Notas pertenece a un Usuario
            //Un Usuario puede tener multiples Notas... | Uno a Muchos |
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Usuario',
        },
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
)

const opcionesParaSecuencia = {
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: 500,
}

notaEsquema.plugin(AutoIncremento, opcionesParaSecuencia)

module.exports = mongoose.model('Nota', notaEsquema)
