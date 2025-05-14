/* eslint-disable */
console.log({ getItems, createItem, deleteItem, addLike, removeLike });
const controllers = require("../controllers/clothingItems");
console.log("Controllers:", Object.keys(controllers));
console.log("addLike:", typeof controllers.addLike);

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
router.put("/:id/likes", validateObjectId, controllers.addLike);
router.delete("/:id/likes", validateObjectId, removeLike);

module.exports = router;
