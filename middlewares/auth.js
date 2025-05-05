/* eslint-disable */

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UnauthorizedError } = require("../utils/errors");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  // eslint-disable-next-line no-console
  console.log("This is an important log");
  console.log("Authorization header:", authorization);

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Authorization required"));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;
  // eslint-disable-next-line no-console
  console.log("This is an important log");
  try {
    payload = jwt.verify(token, JWT_SECRET);
    console.log("Decoded payload:", payload);
    req.user = payload;
    next();
  } catch (err) {
    console.error("Error verifying token:", err);
    next(new UnauthorizedError("Invalid token"));
  }
};
