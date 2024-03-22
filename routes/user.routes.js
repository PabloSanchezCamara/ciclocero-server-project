const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../models/User.model");
const Rutas = require("../models/Rutas.model");

// GET para obtener los detalles del usuario loggeado
// /api/user
router.get("/", async (req, res, next) => {
  
  const loggedId = req.payload._id;
  try {
    const response = await User.findById(loggedId);
    
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

// PATCH para editar foto de usuario loggeado
// /api/user/image
router.patch("/image", async (req, res, next) => {
    const {image} = req.body
    try {
        const response = await User.findByIdAndUpdate(req.payload._id, {

            image
        }, {new: true})
        
        res.status(202).json(response)
    } catch (error) {
        next(error)
    }
})

// PATCH para editar password
// /api/user/password
router.patch("/password", async (req, res, next) => {
  const { password } = req.body;

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

  if (passwordRegex.test(password) === false) {
    res.status(400).json({
      message:
        "password debe contener min 8 caracteres, 1 mayuscula y 1 minuscula y 1 número",
    });
  }

  try {
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);
    

    const response = await User.findByIdAndUpdate(
      req.payload._id,
      {  password: hashPassword},
      { new: true }
    );
    res.status(202).json(response);
  } catch (error) {
    
    next(error);
  }
});

// PATCH para editar email
// /api/user/email
router.patch("/email", async (req, res, next) => {
    const {email} = req.body
    const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

  if (emailRegex.test(email) === false) {
    res.status(400).json({ message: "no esta bien configurado el email" });
    return;
  }

  try {
    // buscamos un user que tenga ese email
    const foundUser = await User.findOne({
        email: email 
    });
    if (foundUser !== null) {
      res.status(400).json({ message: "correo ya registrado" });
      return;
    } 
    const response = await User.findByIdAndUpdate(req.payload._id, 
        {email: email}, {new: true})
        
    res.status(202).json(response)

  } catch (error) {
    next(error)
  }
})

// PATCH para editar username
// /api/user/username
router.patch("/username", async (req, res, next) => {
    const {username} = req.body
    try {
        const foundUser = await User.findOne({
            username: username 
        });
       
        if (foundUser !== null) {
          res.status(400).json({ message: "username ya registrado" });
          return;
        } 
        const response = await User.findByIdAndUpdate(req.payload._id, 
            {username: username}, {new: true})
            
        res.status(202).json(response)
    } catch (error) {
        next(error)
    }
})

// DELETE para eliminar usuario loggeado
// /api/user
router.delete("/", async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.payload._id)
        res.status(202).json({message: "usuario eliminado"})
    } catch (error) {
        next(error)
    }
})

module.exports = router;
