const express = require("express")
const router = express.Router()

const User = require("../models/User.model")

const { isTokenValid } = require("../middlewares/auth.middlewares");

// GET para obtener los detalles del usuario loggeado

// /api/user
router.get("/", isTokenValid, async (req, res, next) => {
    console.log(req.payload)
    const loggedId = req.payload._id
    try {
        const response = await User.findById(loggedId)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})


// GET para listar las rutas del usuario loggeado
// /api/user/rutas



// GET para listas las rutas fav del usuario loggeado
// /api/user/fav


// PATCH para editar foto de usuario loggeado
// /api/user


// PUT para editar los detalles del usuario loggeado
// /api/user


// DELETE para eliminar usuario loggeado
// /api/user




module.exports = router