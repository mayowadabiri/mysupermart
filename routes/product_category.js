const express = require("express");
const router = express.Router();

const { addCategory } = require("../controllers/product_category");
const { validateToken, validateSupervisor } = require("../middleware");

router.post("/add/category", validateToken, validateSupervisor, addCategory);

module.exports = router;
