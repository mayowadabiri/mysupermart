require("dotenv").config();
const express = require("express"),
  cors = require("cors"),
  logger = require("morgan"),
  mongoose = require("mongoose"),
  helmet = require("helmet");

const { SERVER_CONFIG, SERVER_ENDPOINT } = require("./lib");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

const app = express();

// Middleware configuration for the express app
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(logger("dev"));

app.get("/", (req, res) => {
  res.send("Server running on localhost:4000");
});

// User Route
app.use("/api/v1", authRoutes);
app.use("/api/v1", userRoutes);

// Error Handling
app.use((error, req, res, next) => {
  if (error.name !== "Error") {
    return res.status(500).json({
      message: "Error proceessing request",
      code: 500,
    });
  }
  return res.status(400).json({
    message: error.msg,
    code: error.code,
  });
});

// Server Starting up
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0bj1i.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((_) => {
    console.log("Connected to mongogodb");
    app.listen(SERVER_CONFIG.port, () => {
      console.log(`Server listening on ${SERVER_ENDPOINT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to DB");
  });
