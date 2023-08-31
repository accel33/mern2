// Importaciones de Terceros
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Importaciones de Node.js
const path = require('path');

// Importaciones Locales Personales
const raiz = require('./routes/raiz');
const { registrador } = require('./middleware/registrador');
const manejadorDeErrores = require('./middleware/manejadorDeErrores');
const opcionesCors = require('./config/opcionesCors');

const PORT = process.env.PORT || 3000;

const rutaEstatica = path.join(__dirname, 'public');
const rutaRaiz = path.join(__dirname, 'routes', 'raiz');
const ruta404 = path.join(__dirname, 'views', '404.html');

// Middlewares o Intermediarios de codigo
app.use(express.json());
app.use(cors(opcionesCors));
app.use(cookieParser());
app.use(registrador);

// Rutas de la 'Interfaz de Programacion' para Aplicaciones
app.use('/', express.static(rutaEstatica));
app.use('/', require(rutaRaiz));
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(ruta404);
    } else if (req.accepts('json')) {
        res.json({ message: '404 No Encontraado' });
    } else {
        res.type('txt').send('404 No Encontrado');
    }
});
console.log(manejadorDeErrores);
app.use(manejadorDeErrores);

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});
