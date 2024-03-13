const express = require("express")
const router = express.Router()

const Rutas = require("../models/Rutas.model")

const { isTokenValid } = require("../middlewares/auth.middlewares");


// GET listar todas las rutas    // QUERYS?
// /api/rutas   

// un condicional de estoy recibiendo querys? si no lo estoy recibiendo .find() y si si lo recibe .find(lo que hayamos buscado)

router.get("/", isTokenValid, async (req, res, next) => {
    try {
        const response = await Rutas.find().populate("creador")
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})


// POST crear una ruta
// api/rutas
router.post("/", isTokenValid, async (req, res, next) => {
    const { name, difficulty, distanciaEnKm, desnivelEnM, duracionEnHoras, modalidad, circular, comunidad, provincia, creador, image } = req.body

    const response = await Rutas.create({
        name, difficulty, distanciaEnKm, desnivelEnM, duracionEnHoras, modalidad, circular, comunidad, provincia, creador, image
    })
    res.status(201).json(response)
})


// PATCH editar foto de la ruta
// /api/rutas/:rutaId
router.patch("/:rutaId", isTokenValid, async (req, res, next) => {
    const {image} = req.body
    // console.log(req.params.rutaId)
    try {
        const response = await Rutas.findByIdAndUpdate(req.params.rutaId, {image}, {new: true})
        res.status(202).json(response)
    } catch (error) {
        next(error)
    }

})


// PUT editar una ruta 
// /api/rutas/:rutaId
router.put("/:rutaId", isTokenValid, async (req, res, next) => {
    const { name, difficulty, distanciaEnKm, desnivelEnM, duracionEnHoras, modalidad, circular, comunidad, provincia, creador, image } = req.body
    // console.log(req.params.rutaId)
    try {
        const response = await Rutas.findByIdAndUpdate(req.params.rutaId, { name, difficulty, distanciaEnKm, desnivelEnM, duracionEnHoras, modalidad, circular, comunidad, provincia, creador, image }, {new: true})
        res.status(202).json(response)
    } catch (error) {
        next(error)
    }
    // MEJOR PATCH Y QUITAR IMAGE?

})


// DELETE eliminar ruta
// /api/rutas/:rutaId

router.delete("/:rutaId", isTokenValid, async (req, res, next) => {
    try {
        await Rutas.findByIdAndDelete(req.params.rutaId)
        res.status(202).json({message: "ruta eliminada"})
    } catch (error) {
        next(error)
    }
})



module.exports = router