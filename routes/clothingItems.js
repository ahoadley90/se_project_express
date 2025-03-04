const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
  addLike,
  removeLike,
} = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");

// Public route
router.get("/", getItems);

// Apply auth middleware to all protected routes
router.use(auth);

// Protected routes
router.post("/", createItem);
router.delete("/:itemId", deleteItem);

// New routes for adding and removing likes
router.put("/:itemId/likes", addLike);
router.delete("/:itemId/likes", removeLike);

module.exports = router;
