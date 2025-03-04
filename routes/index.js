const router = require("express").Router();
const clothingItemsRoutes = require("./clothingItems");
const userRoutes = require("./users");

router.use("/items", clothingItemsRoutes);
router.use("/users", userRoutes);

module.exports = router;
