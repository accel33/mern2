const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
const asyncHandler = require('express-async-handler');

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
    const { usr, pwd } = req.body
    if (!usr, !pwd) {
        return res.status(400).json({ message: 'Debe ingresar todos los campos' })
    }
    const usuarioEncontrado = await Usuario.findOne({ username: usr }).exec()
    if (!usuarioEncontrado?.active) {
        return res.status(401).json({ message: 'Error con el nombre de usuario' })
    }
    const match = await bcrypt.compare(pwd, usuarioEncontrado.password)
    if (!match) {
        return res.status(401).json({ message: 'Error con la contraseña' })
    }
    const accessToken = jwt.sign(
        {
            'UserInfo': {
                'username': usuarioEncontrado.username,
                'roles': usuarioEncontrado.roles
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '15m' }
    )
    const refreshToken = jwt.sign(
        { 'username': usuarioEncontrado.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    )
    // Crea cookie segura con el refresh token 
    res.cookie('jwt', refreshToken, {
        httpOnly: true, // accesible solo por servidor web
        secure: true, // https
        sameSite: 'None', // cross-site cookie
        maxAge: 7 * 24 * 60 * 60 * 1000 // cookie expiracion: igual que el del refresh token
    })
    // Envia access token conteniendo username y roles
    res.json({ accessToken })

    res.status(200).json({ message: 'Usuario autorizado' })
})

const refresher = async (req, res) => {

}

const logout = async (req, res) => {

}

module.exports = { login, refresher, logout }