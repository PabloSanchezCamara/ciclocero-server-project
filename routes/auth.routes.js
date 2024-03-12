const express = require("express")
const router = express.Router()

const User = require("../models/User.model")

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken")

// POST "/api/auth/signup" => recibir info del usuario y crear documento en la DB



// POST "api/auth/login" => validar las credenciales del usuario y enviar un Token



// GET "/api/auth/verify" => validar el token e indicar que el usuario esta autenticado


module.exports = router