const express = require("express")
const router = express.Router()

const Reseñas = require("../models/Reseñas.model")

const Rutas = require("../models/Rutas.model")

const User = require("../models/User.model")




// POST crear reseña
// /api/reviews
router.post("/", async (req, res, next) => {
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
router.patch("/:reviewId", async (req, res, next) => {
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
router.put("/:reviewId", async (req, res, next) => {
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
router.delete("/:reviewId", async (req, res, next) => {
    
    try {
        await Reseñas.findByIdAndDelete(req.params.reviewId)
        res.status(202).json({message: "review eliminada"})
    } catch (error) {
        next(error)
    }
   
})


// GET listar reviewId por ruta
// /api/reviews/rutas/:rutaId
router.get("/rutas/:rutaId", async (req, res, next) => {
    try {
        const response = await Reseñas.findById(req.params.rutaId)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})

// DEBERIA IR EN RUTAS? llamar al modelo de rutas


// GET listar reviews por usuario 
// /api/reviews/user/:userId

// DEBERIA IR EN USER? llamar al modelo de user

module.exports = router