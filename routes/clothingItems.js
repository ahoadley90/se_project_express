const express = require("express");
const {
  validateClothingItem,
  validateObjectId,
} = require("../middlewares/validation");
const {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  unlikeItem,
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
router.put("/:id/likes", validateObjectId, likeItem);
router.delete("/:id/likes", validateObjectId, unlikeItem);

module.exports = router;
