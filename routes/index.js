const router = require("express").Router();
const clothingItemsRoutes = require("./clothingItems");
const userRoutes = require("./users");
const { createUser, login } = require("../controllers/users");

// Public routes
router.post("/signup", createUser);
router.post("/signin", login);

// Protected routes
router.use("/items", clothingItemsRoutes);
router.use("/users", userRoutes);

module.exports = router;
