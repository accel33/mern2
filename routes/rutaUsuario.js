const express = require('express');
const router = express.Router()
const controller = require('../controllers/usuarioController')

router.route('/')
    .get(controller.obtenerTodosLosUsuarios)
    .post()
    .patch()
    .delete()

module.exports = router
