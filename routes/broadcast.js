const express = require("express");
const router = express.Router();

const { broadcast } = require("../controllers/broadcast");
const { validateToken, validateSupervisor } = require("../middleware");

router.post("/broadcast", validateToken, validateSupervisor, broadcast);

module.exports = router;
