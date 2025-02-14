const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) =>
      res
        .status(500)
        .send({ message: "Error fetching users", error: err.message })
    );
};

const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid user ID" });
      }
      res
        .status(500)
        .send({ message: "Error fetching user", error: err.message });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: "Invalid user data", error: err.message });
      }
      res
        .status(500)
        .send({ message: "Error creating user", error: err.message });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
