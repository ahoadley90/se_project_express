/* eslint-disable */
const express = require("express");
const {
  getItems,
  createItem,
  deleteItem,
  addLike,
  removeLike,
} = require("../controllers/clothingItems");
const {
  validateClothingItem,
  validateObjectId,
} = require("../middlewares/validation");
const auth = require("../middlewares/auth");

console.log(
  "Controllers:",
  Object.keys(require("../controllers/clothingItems"))
);

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
