const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const clothingItemRoutes = require("./routes/clothingItems");

const { PORT = 3001 } = process.env;

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(express.json());
app.use("/users", userRoutes);
app.use("/items", clothingItemRoutes);

// Add this middleware after all other route definitions
app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
