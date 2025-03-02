const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const auth = require("./middlewares/auth");
const { NOT_FOUND, INTERNAL_SERVER_ERROR } = require("./utils/errors");

const { createUser, login } = require("./controllers/users");
const usersRouter = require("./routes/users");
const clothingItemRouter = require("./routes/clothingItems");

const app = express();

//prettier-ignore
mongoose.connect("mongodb://localhost:27017/wtwr_db", {
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Public routes
app.post("/signup", createUser);
app.post("/signin", login);

// Use the router for /items, which includes the public GET route
app.use("/items", clothingItemRouter);
// Protected routes
app.use("/users", auth, usersRouter);

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

// Error handling
app.use(errorLogger);

// Custom error handler
app.use((err, req, res, next) => {
  console.error(err);
  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === INTERNAL_SERVER_ERROR
        ? "An error occurred on the server"
        : message,
  });
});

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
