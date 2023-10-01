const jwt = require('jsonwebtoken')

const verificarJWT = (req, res, next) => {
    // Buscamos header de autorizacion por parte del cliente
    const authHeader = req.headers.authorization || req.headers.Authorization

    // Verificamos si el header empieza con Bearer, de lo contrario no esta autorizado 
    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    // Metodo string para separar la cadena de caracteres por espacios
    const token = authHeader.split(' ')[1]

    // Pasamos token de cliente, token de servidor, decodificamos y anexamos al req
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            req.user = decoded.UserInfo.username
            req.roles = decoded.UserInfo.roles
            next()
        }
    )
}

module.exports = verificarJWT 