require("dotenv").config();
const express = require("express"),
  cors = require("cors"),
  logger = require("morgan"),
  mongoose = require("mongoose"),
  helmet = require("helmet"),
  open = require("open"),
  swaggerUi = require("swagger-ui-express");
openAPIDocumentation = require("./MySuperMart.postman_collection.json");

const { SERVER_CONFIG, SERVER_ENDPOINT } = require("./lib");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/product");
const productCategoryRoutes = require("./routes/product_category");
const broadcast = require("./routes/broadcast");

const app = express();

// Middleware configuration for the express app
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(logger("dev"));

app.get("/", (req, res) => {
  res.send(`Server listening on ${SERVER_ENDPOINT}`);
});

//Routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openAPIDocumentation));
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/product-category", productCategoryRoutes);
app.use("/api/v1", broadcast);

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
    // open(`http://localhost:${SERVER_CONFIG.port}/api-docs`, {
    //   app: { name: open.apps.chrome },
    // });
    app.listen(SERVER_CONFIG.port, () => {
      console.log(`Server listening on ${SERVER_ENDPOINT}`);
      console.log("Connected to mongogodb");
    });
  })
  .catch((error) => {
    console.log("Error connecting to DB");
  });
