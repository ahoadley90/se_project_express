/* eslint-disable */
console.log("This is an important log");
const ClothingItem = require("../models/clothingItem");
const { isValidObjectId } = require("mongoose");
const { BadRequestError, NotFoundError, ForbiddenError } = require("../errors");

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(next);
};

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data provided"));
      } else {
        next(err);
      }
    });
};

const deleteItem = (req, res, next) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return next(new BadRequestError("Invalid item ID"));
  }

  ClothingItem.findById(id)
    .then((item) => {
      if (!item) {
        throw new NotFoundError("Item not found");
      }
      if (item.owner.toString() !== req.user._id) {
        throw new ForbiddenError("You are not authorized to delete this item");
      }
      return ClothingItem.findByIdAndDelete(id);
    })
    .then((item) => {
      if (!item) {
        throw new NotFoundError("Item not found");
      }
      res.send({ message: "Item deleted", item });
    })
    .catch(next);
};

// eslint-disable-next-line no-console
console.log("This is an important log");
const addLike = (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  ClothingItem.findByIdAndUpdate(
    id,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        throw new NotFoundError("Clothing item not found");
      }
      res.send({ data: item });
    })
    .catch(next);
};

const removeLike = (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  ClothingItem.findByIdAndUpdate(
    id,
    { $pull: { likes: userId } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        throw new NotFoundError("Clothing item not found");
      }
      res.send({ data: item });
    })
    .catch(next);
};
module.exports = {
  getItems,
  createItem,
  deleteItem,
  addLike,
  removeLike,
};
