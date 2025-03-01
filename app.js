const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const auth = require("./middlewares/auth");
const { NOT_FOUND, INTERNAL_SERVER_ERROR } = require("./utils/errors");

const usersRouter = require("./routes/users");
const clothingItemRouter = require("./routes/clothingItems");

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/wtwr_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use(auth);

// Protected routes
app.use("/users", usersRouter);
app.use("/items", clothingItemRouter);

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

// Error handling
app.use(errorLogger);
app.use(errors());

// Custom error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(INTERNAL_SERVER_ERROR)
    .send({ message: "An error occurred on the server" });
});
const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
