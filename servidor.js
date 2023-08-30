const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3000;
const raiz = require('./routes/raiz');
const { registrador } = require('./middleware/registrador');
const manejadorDeErrores = require('./middleware/manejadorDeErrores');

const rutaEstatica = path.join(__dirname, 'public');
const rutaRoot = path.join(__dirname, 'routes', 'raiz');
const ruta404 = path.join(__dirname, 'views', '404.html');

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(registrador);

app.use('/', express.static(rutaEstatica));
app.use('/', require(rutaRoot));
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
