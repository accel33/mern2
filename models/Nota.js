const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const notaEsquema = new mongoose.Schema(
    {
        usuario: {
            //Hacemos referencia al usuario, porque Notas pertenece a un Usuario
            //Un Usuario puede tener multiples Notas... | Uno a Muchos |
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Usuario',
        },
        titulo: {
            type: String,
            required: true,
        },
        descripcion: {
            type: String,
            required: true,
        },
        completado: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

notaEsquema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'numerosTicket',
    start_seq: 500,
});

module.exports = mongoose.Model('Nota', notaEsquema);
