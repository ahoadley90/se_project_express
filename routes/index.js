const router = require("express").Router();
const clothingItemRoutes = require("./clothingItems");
const userRoutes = require("./users");
const { createUser, login } = require("../controllers/users");
const {
  validateUserBody,
  validateAuthentication,
} = require("../middlewares/validation");
const { NotFoundError } = require("../utils/errors");

// Middleware for logging requests
router.use((req, res, next) => {
  console.log(
    `[index.js] Received ${req.method} request for ${req.originalUrl}`
  );
  next();
});

router.use((req, res, next) => {
  console.log("Request reached index.js router");
  next();
});

// Public routes
router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateAuthentication, login);

// Protected routes
router.use("/items", clothingItemRoutes);
router.use("/users", userRoutes);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error("Error:", err); // Log the full error
  if (err instanceof NotFoundError) {
    res.status(404).json({ error: err.message });
  } else {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

// Middleware for handling unknown routes
router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
