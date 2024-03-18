const router = require("express").Router();

const { isTokenValid } = require("../middlewares/auth.middlewares");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// /api/auth
const authRouter = require("./auth.routes")
router.use("/auth", authRouter)

// /api/rutas
const rutasRouter = require("./rutas.routes")
router.use("/rutas", isTokenValid, rutasRouter)

// /api/reviews
const reseñasRouter = require("./reseñas.routes")
router.use("/reviews", isTokenValid, reseñasRouter)

// /api/user
const userRouter = require("./user.routes")
router.use("/user", isTokenValid, userRouter)


// Cloudinary
const uploadRoutes = require("./upload.routes");
router.use("/upload", uploadRoutes);

module.exports = router;
