const express = require("express");
const router = express.Router();

const { addProduct, getProducts } = require("../controllers/products");

const { validateToken, validateSupervisor } = require("../middleware");

router.post("/add/product", validateToken, validateSupervisor, addProduct);
router.get("/get/products", validateToken, validateSupervisor, getProducts);

module.exports = router;
