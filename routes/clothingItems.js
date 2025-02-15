const router = require("express").Router();
const {
  getItems,
  getItemById,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

// GET all items
router.get("/", getItems);

// GET a specific item by ID
router.get("/:itemId", getItemById);

// POST a new item
router.post("/", createItem);

// DELETE an item
router.delete("/:itemId", deleteItem);

// PUT like an item
router.put("/:itemId/likes", likeItem);

// DELETE dislike an item
router.delete("/:itemId/likes", dislikeItem);
module.exports = router;
