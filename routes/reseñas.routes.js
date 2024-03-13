const express = require("express")
const router = express.Router()

const Reseñas = require("../models/Reseñas.model")

const { isTokenValid } = require("../middlewares/auth.middlewares");


// POST crear reseña
// /api/reviews
router.post("/", isTokenValid, async (req, res, next) => {
    const { title, description, creador, ruta, image } = req.body
    try {
        const response = await Reseñas.create({
            title, description, creador, ruta, image
        })
        res.status(201).json(response)
    } catch (error) {
        next(error)
    }
})


// PATCH editar foto de reseña
// /api/reviews/:reviewId
router.patch("/:reviewId", isTokenValid, async (req, res, next) => {
    const {image} = req.body
    try {
        const response = await Reseñas.findByIdAndUpdate(req.params.reviewId, {image}, {new: true})
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})


// PUT editar reviewId
// /api/reviews/:reviewId
router.put("/:reviewId", isTokenValid, async (req, res, next) => {
    const { title, description, creador, ruta, image } = req.body

    try {
        const response = await Reseñas.findByIdAndUpdate(req.params.reviewId, { title, description, creador, ruta, image }, {new: true} )
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
    // DEBERIA SER PATH?
})


// DELETE borrar reviewId
// /api/reviews/:reviewId
router.delete("/:reviewId", isTokenValid, async (req, res, next) => {
    
    try {
        await Reseñas.findByIdAndDelete(req.params.reviewId)
        res.status(202).json({message: "review eliminada"})
    } catch (error) {
        next(error)
    }
   
})


// GET listar reviewId por ruta
// /api/reviews/rutas/:rutaId
router.get("/rutas/:rutaId", isTokenValid, async (req, res, next) => {
    try {
        const response = await Reseñas.findById(req.params.rutaId)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})


// GET listar reviews por usuario 
// /api/reviews/user/:userId


module.exports = router