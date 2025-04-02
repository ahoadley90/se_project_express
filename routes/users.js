const express = require("express");
const router = express.Router();

const { getCurrentUser, updateProfile } = require("../controllers/users");
const auth = require("../middlewares/auth");

router.use(auth);

router.get("/", getCurrentUser);
router.patch("/", updateProfile);

module.exports = router;
