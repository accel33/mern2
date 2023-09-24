const express = require('express');
const router = express.Router()
const controller = require('../controllers/usuarioController')

router.route('/')
    .get(controller.obtenerTodosLosUsuarios)
    .post(controller.crearUsuario)
    .patch(controller.actualizarUsuario)
    .delete(controller.borrarUsuario)

module.exports = router
