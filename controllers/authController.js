const jwt = require('jsonwebtoken')
const Usuario = require('../models/Usuario')


const login = async (req, res) => {
    try {
        const { usr, pwd } = req.body
        if (!usr, !pwd) {
            throw new Error('Debe ingresar todos los campos')
        }
        const usuario = await Usuario.findOne({ username: usr }).exec().lean()
        if (!usuario) {
            throw new Error('Usuario no encontrado')
        }
        if (!pwd === usuario.password) {
            throw new Error('Contraseña incorrecta')
        }
        const accessToken = jwt.sign({
            payload: '',

        })
        res.status(200).json({ message: 'Usuario autorizado' })
    } catch (error) {
        throw new Error(error)
    }
}

const refresher = async (req, res) => {

}