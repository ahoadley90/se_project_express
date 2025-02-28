const router = require("express").Router();
const {
  createUser,
  login,
  getCurrentUser,
  updateProfile,
} = require("../controllers/users");
const auth = require("../middlewares/auth");

router.post("/signup", createUser);
router.post("/signin", login);

router.use(auth);
router.get("/me", getCurrentUser);
router.patch("/me", updateProfile);

module.exports = router;
