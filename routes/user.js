const express = require("express");
const router = express.Router();
const { validateSupervisor, validateToken } = require("../middleware");

const { getEmployees, getClients } = require("../controllers/user");

router.get("/get/employees", validateToken, validateSupervisor, getEmployees);
router.get("/get/clients", validateToken, validateSupervisor, getClients);

module.exports = router;
