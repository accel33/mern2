const Usuario = require('../models/Usuario')
const Nota = require('../models/Nota')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');

// @desc Obtener todo los Usuarios
// @ruta GET /usuarios
// @acceso Privado
const obtenerTodosLosUsuarios = asyncHandler(fnObtenerUsuarios)

async function fnObtenerUsuarios(req, res) {
    const usuarios = await Usuario.find().select('-password').lean()
    if (!usuarios) {
        return res.status(400).json({ message: 'Usuarios no encontrados' })
    }
    res.json(usuarios)
}

// @desc Crear un Usuario
// @ruta POST /usuarios
// @acceso Privado
const crearUsuario = asyncHandler(async (req, res) => {
    const { nombreDeUsuario, password, roles } = req.body
    // Confirmar data... no hay ningun elemento en roles[] || roles[] no es un arreglo
    if (!nombreDeUsuario || !password || !roles.length || !Array.isArray(roles)) {
        return res.status(400).json({ message: 'Todos los campos para los solicitud son requeridos' })
    }
    // Revisar duplicados
    const duplicado = await Usuario.findOne({ nombreDeUsuario }).lean().exec()
    if (duplicado) {
        return res.status(409).json({ message: 'Nombre de usuario duplicado' })
    }
    // Encriptar el password
    const passwordEncriptada = bcrypt.hash(password, 10) // Se graba encriptada en la base de datos
    const usuarioObjeto = { nombreDeUsuario, password: passwordEncriptada, roles }

    // Crear y almacenar el nuevo usuario
    const usuario = await Usuario.create(usuarioObjeto)
    if (usuario) {
        res.status(201).json({ message: 'Nuevo Usuario ha sido creado' })
    } else {
        res.status(400).json({ message: 'Data invalida de Usuario ha sido recibida' })
    }
})

// @desc Actualizar un Usuario
// @ruta PATCH /usuarios/:id
// @acceso Privado
const actualizarUsuario = asyncHandler(async (req, res) => {
    const { id, nombreDeUsuario, password, roles, activo } = req.body
    if (!id || !nombreDeUsuario || !password || !roles.length || !Array.isArray(roles) || typeof activo !== 'boolean') {
        return res.status(400).json({ message: 'Todos los campos son requeridos para la solicitud' })
    }
    // Hay que encontrar el Usuario y luego modificarlo
    // No llamamos lean(), porque ahora si necesitamos los metodos .save() y otros adicionales
    const usuario = await Usuario.findById(id).exec()
    if (!usuario) {
        return res.status(400).json({ message: 'Usuario no encontrado' })
    }

    // Una vez el duplicado pero de manera distinta
    const usuarioDuplicado = await Usuario.findOne({ nombreDeUsuario }).lean().exec()

    // Permitir actualizaciones al usuario original 
    // El id del usuario con nombreDeUsuario duplicado es igual al id pasado por el cliente
    // De no ser igual significa que 
    if (usuarioDuplicado && usuarioDuplicado?._id.toString() !== id) {
        return res.status(409).json({ message: 'Nombre de usuario duplicado' })
    }
    const encriptacion = bcrypt.hash(password, 10)
    const usuarioObjeto = { nombreDeUsuario, password: encriptacion, roles, activo }
    const usuario = await Usuario.updateOne(usuarioObjeto)
    if (usuario) {
        res.status(201).json({ message: 'Usuario actualizado' })
    } else {
        res.status(400).json({ message: 'Data invalida de Usuario ha sido recibida' })
    }
})

// @desc Borrar un Usuario
// @ruta DELETE /usuarios/:id
// @acceso Privado
const borrarUsuario = asyncHandler(async (req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).json({ message: 'ID del Usuario es requerido' })
    }
    // El usuario existe para poder ser borrado?
    const usuario = await Usuario.findById(id).exec()
    if (!usuario) {
        return res.status(400).json({ message: 'Usuario no encontrado' })
    }
    const resultado = await usuario.deleteOne()
    const respuesta = `Nombre del usuario ${result.username} con el ID ${result._id} borrado`
    res.json(respuesta)
})

module.exports = { obtenerTodosLosUsuarios, actualizarUsuario, crearUsuario, borrarUsuario }