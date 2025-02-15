const router = require("express").Router();
const clothingItemRoutes = require("./clothingItems");
const userRoutes = require("./users");

router.use("/items", clothingItemRoutes);
router.use("/users", userRoutes);

module.exports = router;
