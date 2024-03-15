const jwt = require("jsonwebtoken");

function isTokenValid(req, res, next) {
    try {

        console.log(req.headers.authorization);

        const tokenArr = req.headers.authorization.split(" ")

        const token = tokenArr[1]
        console.log(token)

        const payload = jwt.verify(token, process.env.TOKEN_SECRET)

        req.payload = payload

        next()

    } catch (error) {
        res.status(401).json({errorMessage: "Token no valido o expirado"});
    }
}

module.exports = {
    isTokenValid
}