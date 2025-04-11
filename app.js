const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const routes = require("./routes");

const app = express();
const PORT = 3001;

mongoose.connect("mongodb://localhost:27017/wtwr_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errors());

app.use((err, req, res, next) => {
  console.error("Error:", err);
  const { statusCode = 500, message } = err;
  console.error(`Status: ${statusCode}, Message: ${message}`);
  res.status(statusCode).send({
    message: statusCode === 500 ? "An error occurred on the server" : message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
