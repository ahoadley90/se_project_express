const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");

router.post("/signup", async (req, res, next) => {
  try {
    const { email, password, name, avatar } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hash, name, avatar });
    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
