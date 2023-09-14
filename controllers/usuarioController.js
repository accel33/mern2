const Usuario = require('../models/Usuario')
const eah = require('express-async-handler')
const bcrypt = require('bcrypt');

// @desc Obtener todo los Usuarios
// @ruta GET /usuarios
// @acceso Privado
const obtenerTodosLosUsuarios