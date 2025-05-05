const router = require("express").Router();
const clothingItemsRoutes = require("./clothingItems");
const userRoutes = require("./users");
const { createUser, login } = require("../controllers/users");
const {
  validateUserBody,
  validateAuthentication,
} = require("../middlewares/validation");

// Public routes
router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateAuthentication, login);

// Protected routes
router.use("/items", clothingItemsRoutes);
router.use("/users", userRoutes);

// Middleware for handling unknown routes
router.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

module.exports = router;
