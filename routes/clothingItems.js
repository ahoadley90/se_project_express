/* eslint-disable */
console.log({ getItems, createItem, deleteItem, addLike, removeLike });
const controllers = require("../controllers/clothingItems");
console.log("Controllers:", controllers);
console.log("addLike:", controllers.addLike);

const express = require("express");
const {
  validateClothingItem,
  validateObjectId,
} = require("../middlewares/validation");
const {
  getItems,
  createItem,
  deleteItem,
  addLike,
  removeLike,
} = require("../controllers/clothingItems");
console.log("Destructured addLike:", addLike);

const auth = require("../middlewares/auth");

const router = express.Router();

// Public routes
router.get("/", getItems);

// Apply auth middleware to all protected routes
router.use(auth);

// Protected routes
router.post("/", validateClothingItem, createItem);
router.delete("/:id", validateObjectId, deleteItem);

// New routes for adding and removing likes
router.put("/:id/likes", validateObjectId, addLike);
router.delete("/:id/likes", validateObjectId, removeLike);

module.exports = router;
