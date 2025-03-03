const router = require("express").Router();
const clothingItemRouter = require("./clothingItems");
const usersRouter = require("./users");
const auth = require("../middlewares/auth");
const { createUser, login } = require("../controllers/users");

// Public routes
router.post("/signup", createUser);
router.post("/signin", login);

// Use the router for /items, includes public routes.
router.use("/items", clothingItemRouter);

// Protected routes
router.use("/users", auth, usersRouter);
module.exports = router;
