const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { createUser, login } = require("./controllers/users");
const userRouter = require("./routes/users");
const clothingItemRouter = require("./routes/clothingItems");

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://localhost:27017/wtwr_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(cors());

//routes for signup and signin
app.post("/signup", createUser);
app.post("/signin", login);

// Use routers
app.use("/users", userRouter);
app.use("/items", clothingItemRouter);

app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
  console.log("This is working");
});
