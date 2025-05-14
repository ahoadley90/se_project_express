/* eslint-disable */
const express = require("express");
const controllers = require("../controllers/clothingItems");
const {
  validateClothingItem,
  validateObjectId,
} = require("../middlewares/validation");
const auth = require("../middlewares/auth");

console.log("Controllers:", controllers);
console.log("addLike function:", controllers.addLike);
console.log("All controllers:", controllers);

const router = express.Router();

// Log all requests
router.use((req, res, next) => {
  console.log(
    `[clothingItems.js] Received ${req.method} request for ${req.originalUrl}`
  );
  next();
});

// Public routes
router.get("/", controllers.getItems);

// Apply auth middleware to all protected routes
router.use(auth);

// Protected routes
router.post("/", validateClothingItem, controllers.createItem);
router.delete("/:id", validateObjectId, controllers.deleteItem);

// New routes for adding and removing likes
router.put("/:id/likes", validateObjectId, controllers.addLike);
router.delete("/:id/likes", validateObjectId, controllers.removeLike);

module.exports = router;
