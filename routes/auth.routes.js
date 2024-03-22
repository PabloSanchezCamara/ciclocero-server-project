const express = require("express");
const router = express.Router();

const User = require("../models/User.model");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const { isTokenValid } = require("../middlewares/auth.middlewares");

// POST "/api/auth/signup" => recibir info del usuario y crear documento en la DB

router.post("/signup", async (req, res, next) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    res
      .status(400)
      .json({ message: "email, username y password son obligatorios" });
    return;
  }

  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;

  if (passwordRegex.test(password) === false) {
    res
      .status(400)
      .json({
        message:
          "password debe contener min 8 caracteres, 1 mayuscula y 1 minuscula y 1 número",
      });
  }

  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;

  if (emailRegex.test(email) === false) {
    res.status(400).json({ message: "no esta bien configurado el email" });
    return;
  }

  try {
    // validar que el usuario no exista en la DB
    // creamos 2 .findOne, uno para email y otro para username
    const foundUserEmail = await User.findOne({
        email: email 
    });
    if (foundUserEmail !== null) {
      res.status(400).json({ message: "correo ya registrado" });
      return;
    } 

    const foundUserUsername = await User.findOne({
        username: username 
    });
   
    if (foundUserUsername !== null) {
      res.status(400).json({ message: "username ya registrado" });
      return;
    } 

    


    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);
    

    const response = await User.create({
      email,
      password: hashPassword,
      username,
    });

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

// POST "api/auth/login" => validar las credenciales del usuario y enviar un Token

router.post("/login", async (req, res, next) => {
  
  const { credential, password } = req.body;
  

  if (!credential || !password) {
    res.status(400).json({ message: "credential y password obligatorios" });
    return;
  }

  try {
    // compronar si el usuario existe o no en la DB
    const foundUser = await User.findOne({
      $or: [{ email: credential }, {username: credential }]
    });
    if (foundUser === null) {
      res.status(400).json({ message: "usuario no registrado" });
      return;
    }

    // comprobar que la contraseña es correcta
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (isPasswordCorrect === false) {
      res.status(400).json({ message: "contraseña incorrecta" });
      return;
    }

    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
      username: foundUser.username,
      // de momento no tenemos roles
    };

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "10d", // poner que expire si el usuario no entra en X tiempo
    });
    res.status(200).json({authToken: authToken})
  } catch (error) {
    next(error);
  }
});

// GET "/api/auth/verify" => validar el token e indicar que el usuario esta autenticado

router.get("/verify", isTokenValid, (req, res, next) => {
  

  res.json(req.payload);
});

module.exports = router;
