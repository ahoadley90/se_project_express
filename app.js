const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const { NotFoundError } = require("./utils/errors");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const routes = require("./routes");

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect("mongodb://localhost:27017/wtwr_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(requestLogger);

// Routes
app.use(routes);

app.use(errorLogger);
app.use(errors());

// 404 Not Found Error
app.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

// Error handler
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? "An error occurred on the server" : message,
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at port ${PORT}`);
});
