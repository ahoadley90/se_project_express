const router = require("express").Router();
const {
  getItems,
  createItem,
  deleteItem,
} = require("../controllers/clothingItems");
const auth = require("../middlewares/auth");

// Public route
router.get("/", getItems);

// Apply auth middleware to all routes
router.use(auth);

// Protected routes
router.post("/", createItem);
router.delete("/:itemId", deleteItem);

module.exports = router;
