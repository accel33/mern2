const express = require('express')
const app = express()
const path = require('path');
const PORT = process.env.PORT || 3000

const ruta = path.join(__dirname, '/public')
const ruta404 = path.join(__dirname, 'views', '404.html')

app.use('/', express.static(path.join(__dirname, '/public')))
app.use('/', require('./routes/root'))
console.log(ruta404);
app.all('*', (req, res) => {
  res.status(404)
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({ message: '404 No Encontraado' })
  } else {
    res.type('txt').send('404 No Encontrado')
  }
})

app.listen(PORT, () => {
  console.log(`Escuchando en el puerto ${PORT}`);
})


