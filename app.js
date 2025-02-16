const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { NOT_FOUND } = require("./utils/errors");

const routes = require("./routes/index"); // Make sure this path is correct

const { PORT = 3001 } = process.env;

const app = express();

//prettier-ignore
mongoose.connect("mongodb://localhost:27017/wtwr_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.error("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133",
  };
  next();
});
app.use(routes);

app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

app.listen(PORT, () => {
  console.error(`App listening at port ${PORT}`);
});
