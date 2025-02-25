const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { createUser, login } = require("./controllers/users");
const userRouter = require("./routes/users");
const clothingItemRouter = require("./routes/clothingItems");
const auth = require("./middleware/auth");

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://localhost:27017/wtwr_db");

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

app
  .listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
    console.log("This is working");
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`Port ${PORT} is already in use. Trying ${PORT + 1}...`);
      app.listen(PORT + 1);
    } else {
      console.error("An error occurred:", err);
    }
  });
