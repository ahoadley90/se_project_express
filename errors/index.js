const NotFoundError = require("./NotFoundError");
const ForbiddenError = require("./ForbiddenError");
const BadRequestError = require("./BadRequestError");
const InternalServerError = require("./InternalServerError");
const ConflictError = require("./ConflictError");
const UnauthorizedError = require("./UnauthorizedError");

module.exports = {
  NotFoundError,
  ForbiddenError,
  BadRequestError,
  InternalServerError,
  ConflictError,
  UnauthorizedError,
};
