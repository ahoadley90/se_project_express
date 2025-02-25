/* eslint-disable no-console */

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { createUser, login } = require("./controllers/users");
const userRouter = require("./routes/users");
const clothingItemRouter = require("./routes/clothingItems");
const auth = require("./middleware/auth");

const { PORT = 3001 } = process.env;
const app = express();

// prettier-ignore
mongoose.connect("mongodb://localhost:27017/wtwr_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

app.use(express.json());
app.use(cors());

// Unprotected routes
app.post("/signup", createUser);
app.post("/signin", login);
app.get("/items", clothingItemRouter);

// Protected routes
app.use(auth); // Apply auth middleware to all routes below this line
app.use("/users", userRouter);
app.use("/items", clothingItemRouter);

app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: "An error occurred on the server" });
});

// eslint-disable no-console
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
  console.log("This is working");
});
