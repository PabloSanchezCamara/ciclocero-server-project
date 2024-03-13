const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// /api/auth
const authRouter = require("./auth.routes")
router.use("/auth", authRouter)

// /api/rutas
const rutasRouter = require("./rutas.routes")
router.use("/rutas", rutasRouter)

// /api/reviews
const reseñasRouter = require("./reseñas.routes")
router.use("/reviews", reseñasRouter)

// /api/user
const userRouter = require("./user.routes")
router.use("/user", userRouter)

module.exports = router;
