const express = require("express")
const router = express.Router()

const Reseñas = require("../models/Reseñas.model")

// POST crear reseña
// /api/reviews
router.post("/", async (req, res, next) => {
    console.log(req.payload)
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

// PATCH editar foto de reseña
// /api/reviews/:reviewId
router.patch("/image/:reviewId", async (req, res, next) => {
    const {image} = req.body
    try {
        const response = await Reseñas.findByIdAndUpdate(req.params.reviewId, {image}, {new: true})
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})

// PATCH editar reviewId
// /api/reviews/:reviewId
router.patch("/content/:reviewId", async (req, res, next) => {
    const { title, description } = req.body

    try {
        const response = await Reseñas.findByIdAndUpdate(req.params.reviewId, { title, description }, {new: true} )
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
    // DEBERIA SER PATH?
})

// GET listar reviewId por ruta
// /api/reviews/rutas/:rutaId
router.get("/rutas/:rutaId", async (req, res, next) => {
    console.log( req.params.rutaId)
    try {
        const response = await Reseñas.find({ruta: req.params.rutaId}).populate({
            path: "creador",
            select: { username: 1, image: 1, _id: 0 },
        })
        console.log(response)
        res.status(200).json(response)
    } catch (error) {
        next(error)
    }
})

// GET listar reviews por usuario 
// /api/reviews/user
router.get("/user", async (req, res, next) => {
    try {
        const response = await Reseñas.find({ creador: req.payload._id }).populate({
            path: "creador",
            select: { username: 1, image: 1, _id: 0 },
        });
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
})

// DELETE borrar reviewId
// /api/reviews/:reviewId
router.delete("/:reviewId", async (req, res, next) => {
    console.log(req.params)
    
    try {
        await Reseñas.findByIdAndDelete(req.params.reviewId)
        res.status(202).json({message: "review eliminada"})
    } catch (error) {
        next(error)
    }
   
})

module.exports = router