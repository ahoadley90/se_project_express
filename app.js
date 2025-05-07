/* eslint-disable */
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const routes = require("./routes");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const { PORT = 3001 } = process.env;

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/wtwr_db";

mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(express.json());

app.use(requestLogger);

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "Server is alive" });
});

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// your routes
app.use(routes);

app.use(errorLogger);

// Celebrate error handler
app.use(errors());

//  centralized error handler
app.use(errorHandler);

app.listen(PORT, () => {});
