const express = require('express')
const router = express.Router()
const path = require('path')

router.get('^/$|/index(.html)?', (req, res) => {
    const htmlRuta = path.join(__dirname, '..', 'views', 'index.html ')
    res.sendFile(htmlRuta.trim()) // Enviamos la ruta donde se encuentra el archivo html
})

module.exports = router
