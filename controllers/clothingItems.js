const ClothingItem = require("../models/clothingItem");

// GET /items — returns all clothing items
const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) =>
      res
        .status(500)
        .send({ message: "Error fetching items", error: err.message })
    );
};

// POST /items — creates a new item
const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  // Note: You'll need to implement user authentication and get the actual user ID
  const owner = "placeholder_user_id";

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(400)
          .send({ message: "Invalid item data", error: err.message });
      }
      res
        .status(500)
        .send({ message: "Error creating item", error: err.message });
    });
};

// DELETE /items/:itemId — deletes an item by _id
const deleteItem = (req, res) => {
  ClothingItem.findByIdAndRemove(req.params.itemId)
    .then((item) => {
      if (!item) {
        return res.status(404).send({ message: "Item not found" });
      }
      res.send({ message: "Item deleted" });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid item ID" });
      }
      res
        .status(500)
        .send({ message: "Error deleting item", error: err.message });
    });
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
};
