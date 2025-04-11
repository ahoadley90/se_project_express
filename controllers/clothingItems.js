const ClothingItem = require("../models/clothingItem");
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
  const { itemId } = req.params;

  console.log(`Attempting to delete item with id: ${itemId}`);

  ClothingItem.findByIdAndRemove(itemId)
    .then((item) => {
      if (!item) {
        console.log(`Item with id ${itemId} not found`);
        throw new NotFoundError("Item not found");
      }
      console.log(`Item with id ${itemId} deleted successfully`);
      res.send({ message: "Item deleted" });
    })
    .catch((err) => {
      console.error(`Error deleting item with id ${itemId}:`, err);
      next(err);
    });
};

const addLike = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        throw new NotFoundError("Clothing item not found");
      }
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid item id"));
      } else {
        next(err);
      }
    });
};

const removeLike = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        throw new NotFoundError("Clothing item not found");
      }
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid item id"));
      } else {
        next(err);
      }
    });
};
module.exports = {
  getItems,
  createItem,
  deleteItem,
  addLike,
  removeLike,
};
