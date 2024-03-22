const express = require("express")
const router = express.Router()

const Reseñas = require("../models/Reseñas.model")

// POST crear reseña
// /api/reviews
router.post("/", async (req, res, next) => {
    
    const { title, description, creador, ruta, image } = req.body
    try {
        const response = await Reseñas.create({
            title, description, creador: req.payload._id, ruta, image
        })
        res.status(201).json(response)
    } catch (error) {
        next(error)
    }
})


// GET listar reviewId por ruta
// /api/reviews/rutas/:rutaId
router.get("/rutas/:rutaId", async (req, res, next) => {
    try {
        const response = await Reseñas.find({ruta: req.params.rutaId}).populate({
            path: "creador",
            select: { username: 1, image: 1, _id: 1 },
        })
        
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
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

module.exports = router