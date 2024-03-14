const express = require("express")
const router = express.Router()

const Rutas = require("../models/Rutas.model")




// GET listar todas las rutas    
// /api/rutas   

router.get("/", async (req, res, next) => {
    const query = req.query
    console.log(query)
    try {
        const response = await Rutas.find(query).populate({
            path: "creador",
            select: {"username": 1, "image": 1, "_id": 0}})
        res.status(200).json(response) 
    } catch (error) {
        next(error)
    }
})


// POST crear una ruta
// api/rutas
router.post("/", async (req, res, next) => {
    const { name, difficulty, distanciaEnKm, desnivelEnM, duracionEnHoras, modalidad, circular, comunidad, provincia, creador, image } = req.body

    const response = await Rutas.create({
        name, difficulty, distanciaEnKm, desnivelEnM, duracionEnHoras, modalidad, circular, comunidad, provincia, creador, image
    })
    res.status(201).json(response)
})


// PATCH editar foto de la ruta
// /api/rutas/:rutaId
router.patch("/:rutaId", async (req, res, next) => {
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
router.put("/:rutaId", async (req, res, next) => {
    const { name, difficulty, distanciaEnKm, desnivelEnM, duracionEnHoras, modalidad, circular, comunidad, provincia, creador, image } = req.body
    // console.log(req.params.rutaId)
    try {
        const response = await Rutas.findByIdAndUpdate(req.params.rutaId, { name, difficulty, distanciaEnKm, desnivelEnM, duracionEnHoras, modalidad, circular, comunidad, provincia, creador, image }, {new: true})
        res.status(202).json(response)
    } catch (error) {
        next(error)
    }
    // MEJOR PATCH Y QUITAR IMAGE? SI

})


// DELETE eliminar ruta
// /api/rutas/:rutaId

router.delete("/:rutaId", async (req, res, next) => {
    try {
        await Rutas.findByIdAndDelete(req.params.rutaId)
        res.status(202).json({message: "ruta eliminada"})
    } catch (error) {
        next(error)
    }
})



module.exports = router