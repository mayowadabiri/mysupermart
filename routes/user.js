const express = require("express");
const router = express.Router();
const { validateSupervisor, validateToken } = require("../middleware");

const { getEmployees } = require("../controllers/user");

router.get("/get/employees", validateToken, validateSupervisor, getEmployees);

module.exports = router;
