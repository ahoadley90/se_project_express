require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const routes = require("./routes/index");
const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();
const { PORT = 3001, NODE_ENV } = process.env;

const MONGODB_URI =
  "mongodb://akimmets:Ek8Ek8Ek8@3.216.156.173:27017,3.216.156.174:27017,3.216.156.175:27017/wtwr_db?ssl=true&replicaSet=atlas-yvqjvxr-shard-0&authSource=admin&retryWrites=true&w=majority";

console.log(
  "Attempting to connect to MongoDB at:",
  MONGODB_URI.replace(/\/\/.*@/, "//****:****@")
);

//prettier-ignore
mongoose.connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// CORS for your production domain
app.use(
  cors({
    origin: "https://wtwrproject.twilightparadox.com",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

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

app.get("/", (req, res) => {
  res.send("WTWR API is running");
});

// routes
app.use("/api", routes);

app.use(errorLogger);

// Celebrate error handler
app.use(errors());

//  centralized error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("info", `Server is running on port ${PORT}`);
});
