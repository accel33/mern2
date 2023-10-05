const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const Usuario = require('../models/Usuario');
const asyncHandler = require('express-async-handler');

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body
    // Verificacion de Usuario y Contraseña
    if (!username, !password) {
        return res.status(400).json({ message: 'Debe ingresar todos los campos' })
    }
    const usuarioEncontrado = await Usuario.findOne({ username: username }).exec()
    // Verificacion de Usuario sea el correcto 
    if (!usuarioEncontrado?.active) {
        return res.status(401).json({ message: 'Error con el nombre de usuario' })
    }
    const match = await bcrypt.compare(password, usuarioEncontrado.password)
    // Verificamos que el Contraseña sea el correcto
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
        { expiresIn: '1m' }
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

// @desc Refresh
// @route POST /auth/refresh
// @access Public
const refresher = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) {
        return res.status(401).json({ message: 'No Autorizado' })
    }
    const refreshToken = cookies.jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        asyncHandler(async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Prohibido' })
            }
            const usuarioEncontrado = await Usuario.findOne({ username: decoded.username })
            if (!usuarioEncontrado) {
                return res.status(401).json({ message: 'Error con el nombre de usuario' })
            }
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": usuarioEncontrado.username,
                        "roles": usuarioEncontrado.roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1m' }
            )
            res.json({ accessToken })
        })
    )
}

// @desc Logout
// @route POST /auth/logout
// @access Public - Solo para liberar la Cookie si existe
const logout = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204) // Sin contenido
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true })
    res.json({ message: 'Cookie liberada' })
}

module.exports = { login, refresher, logout }