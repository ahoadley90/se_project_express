const router = require("express").Router();
const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");

// Get all clothing items
router.get("/", getClothingItems);

// Create a new clothing item
router.post("/", createClothingItem);

// Delete a clothing item
router.delete("/:itemId", deleteClothingItem);

// Like an item
router.put("/:itemId/likes", likeItem);

// Unlike an item
router.delete("/:itemId/likes", unlikeItem);
module.exports = router;
