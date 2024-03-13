const express = require("express")
const router = express.Router()

const Rutas = require("../models/Rutas.model")


// GET listar todas las rutas    // QUERYS?
// /api/rutas   

// un condicional de estoy recibiendo querys? si no lo estoy recibiendo .find() y si si lo recibe .find(lo que hayamos buscado)


// POST crear una ruta
// api/rutas


// PATCH editar foto de la ruta
// /api/rutas/:rutaId


// PUT editar una ruta 
// /api/rutas/:rutaId


// DELETE eliminar ruta
// /api/rutas/:rutaId



module.exports = router