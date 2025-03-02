const ClothingItem = require("../models/clothingItem");
const {
  NOT_FOUND,
  FORBIDDEN,
  BAD_REQUEST,
  CREATED,
  OK,
} = require("../utils/errors");

// Get all clothing items
const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(OK).send(items))
    .catch(() => res.status(BAD_REQUEST).send({ message: "Error occurred" }));
};

// Create a new clothing item
const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(CREATED).send(item))
    .catch(() => res.status(BAD_REQUEST).send({ message: "Error occurred" }));
};

// Delete a clothing item
const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findById(itemId)
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      if (item.owner.toString() !== userId.toString()) {
        return res
          .status(FORBIDDEN)
          .send({ message: "You don't have permission to delete this item" });
      }
      return ClothingItem.findByIdAndDelete(itemId);
    })
    .then((deletedItem) => {
      if (!deletedItem) {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      res.status(OK).send({ message: "Item deleted" });
    })
    .catch(() => res.status(BAD_REQUEST).send({ message: "Error occurred" }));
};

// Like an item
const likeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      res.status(OK).send(item);
    })
    .catch(() => res.status(BAD_REQUEST).send({ message: "Error occurred" }));
};

// Unlike an item
const unlikeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND).send({ message: "Item not found" });
      }
      res.status(OK).send(item);
    })
    .catch(() => res.status(BAD_REQUEST).send({ message: "Error occurred" }));
};

module.exports = {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  unlikeItem,
};
