const express = require('express')
const router = express.Router()
const path = require('path')

router.get('^/$||/index(.html)?', (req, res) => {
  const ruta = path.join(__dirname, '..', 'views', 'index.html ')
  res.sendFile()
})

module.exports = router