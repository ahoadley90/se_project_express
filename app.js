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
const MONGODB_URI = "mongodb://localhost:27017/wtwr_db";

// Ensure MONGODB_URI is set
if (!MONGODB_URI) {
  console.error("MONGODB_URI is not set in environment variables");
  process.exit(1);
}

console.log(
  "Attempting to connect to MongoDB at:",
  MONGODB_URI.replace(/\/\/.*@/, "//****:****@")
);

//prettier-ignore
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  })
  .then(() => console.log("Connected to local MongoDB"))
  .catch((err) => {
    console.error("Error connecting to local MongoDB:", err);
    process.exit(1);
  });

// CORS for production domain
app.use(
  cors({
    origin:
      NODE_ENV === "production"
        ? "https://wtwrproject.twilightparadox.com"
        : "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.use(requestLogger);

app.get("/ping", (req, res) => {
  res.status(200).json({ message: "Server is alive" });
});

if (NODE_ENV !== "production") {
  app.get("/crash-test", () => {
    setTimeout(() => {
      throw new Error("Server will crash now");
    }, 0);
  });
}

app.get("/", (req, res) => {
  res.send("WTWR API is running");
});

// routes
app.use("/", routes);

app.use(errorLogger);

// Celebrate error handler
app.use(errors());

// centralized error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
