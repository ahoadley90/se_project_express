const express = require("express");
const router = express.Router();

const {
  validateUserBody,
  validateAuthentication,
  validateObjectId,
} = require("../middlewares/validation");
const {
  getCurrentUser,
  updateProfile,
  createUser,
  login,
} = require("../controllers/users");
const auth = require("../middlewares/auth");

router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateAuthentication, login);
router.use(auth);

router.get("/me", getCurrentUser);
router.patch("/me", validateUserBody, updateProfile);

module.exports = router;
