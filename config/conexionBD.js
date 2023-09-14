const mongoose = require('mongoose');

const conectarBaseDeDatos = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI2);
    } catch (err) {
        console.log(err);
    }
};

module.exports = conectarBaseDeDatos;
