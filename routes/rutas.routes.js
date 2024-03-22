const express = require("express")
const router = express.Router()

const Rutas = require("../models/Rutas.model")

// GET listar todas las rutas    
// /api/rutas   
router.get("/", async (req, res, next) => {
  
    try {
        const response = await Rutas.find().populate({
            path: "creador",
            select: {"username": 1, "image": 1, "_id": 1}
        })
        
        res.status(200).json(response) 
    } catch (error) {
        next(error)
    }
})

// GET listar rutas del usuario
//api/rutas/user
router.get("/user", async (req, res, next) => {

    try {
        const response = await Rutas.find({creador: req.payload._id})
        res.status(200).json(response)
        
    } catch (error) {
        next(error)
    }
})

// GET listar todas las rutas con querys 
// /api/rutas/query   
router.get("/query", async (req, res, next) => {
    const queryValue = req.query.queryValue.toLowerCase()
    //busquedas multiples con el OR en el find() con el valor que viene del FE
    try {
        const response = await Rutas.find({$or: [{provincia: queryValue}, {difficulty: queryValue}, {modalidad: queryValue}]}).populate({
            path: "creador",
            select: {"username": 1, "image": 1, "_id": 1}
        })
        
        res.status(200).json(response) 
    } catch (error) {
        next(error)
    }
})

// GET listar detalles de una ruta
router.get("/:rutaId", async (req, res, next) => {
    try {

        const response = await Rutas.findById(req.params.rutaId).populate({
            path: "creador",
            select: {"username": 1, "image": 1, "_id": 1}
        })
        res.status(200).json(response)
        
    } catch (error) {
        next(error)
    }
})

// POST crear una ruta
// api/rutas
router.post("/", async (req, res, next) => {
    
    const { name, difficulty, distanciaEnKm, desnivelEnM, duracionEnHoras, modalidad, provincia, creador, image, coordinatesStart, coordinatesEnd } = req.body

    const response = await Rutas.create({
        name, difficulty, distanciaEnKm, desnivelEnM, duracionEnHoras, modalidad, provincia, creador:req.payload._id, image, coordinatesStart, coordinatesEnd
    })
    res.status(201).json(response)
})

// PATCH editar foto de la ruta
// /api/rutas/:rutaId
router.patch("/image/:rutaId", async (req, res, next) => {
    const {image} = req.body
    
    try {
        const response = await Rutas.findByIdAndUpdate(req.params.rutaId, {image}, {new: true})
        res.status(202).json(response)
    } catch (error) {
        next(error)
    }

})

// PATCH editar una ruta 
// /api/rutas/:rutaId
router.patch("/details/:rutaId", async (req, res, next) => {
    const { name, difficulty, distanciaEnKm, desnivelEnM, duracionEnHoras, modalidad, provincia } = req.body
    
    try {
        const response = await Rutas.findByIdAndUpdate(req.params.rutaId, { name, difficulty, distanciaEnKm, desnivelEnM, duracionEnHoras, modalidad, provincia }, {new: true})
        res.status(202).json(response)
    } catch (error) {
        next(error)
    }

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