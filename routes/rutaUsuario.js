const express = require('express')
const router = express.Router()
const controller = require('../controllers/usuarioController')
const verificarJWT = require('../middleware/verificarJWT')

router.use(verificarJWT)

router.route('/')
    .get(controller.obtenerTodosLosUsuarios)
    .post(controller.crearUsuario)
    .patch(controller.actualizarUsuario)
    .delete(controller.borrarUsuario)

module.exports = router
