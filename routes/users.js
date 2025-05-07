/* eslint-disable */

const express = require("express");
const router = express.Router();
const { validateUserUpdate } = require("../middlewares/validation");
const { getCurrentUser, updateProfile } = require("../controllers/users");
const auth = require("../middlewares/auth");

// Apply auth middleware to all routes in this file
router.use(auth);

// Get the current user's information
router.get("/me", getCurrentUser);

// Update the current user's profile
router.patch("/me", validateUserUpdate, updateProfile);

module.exports = router;
