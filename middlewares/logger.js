const winston = require("winston");
const expressWinston = require("express-winston");

// Create a request logger
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "request.log" }),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
});

// Create an error logger
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log" }),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
});

module.exports = {
  requestLogger,
  errorLogger,
};
