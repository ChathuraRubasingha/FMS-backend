const express = require("express"),
	router = express.Router();
const Repair = require("../controllers/Repair_controller");

router.get("/Repair", Repair.GetRepair);

module.exports = router;
