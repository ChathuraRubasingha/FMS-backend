const express = require("express"),
	router = express.Router();
const PerformanceDriver = require("../controllers/PerformanceDriver_controller");

router.get("/PerformanceDriver", PerformanceDriver.GetPerformanceDriver);

module.exports = router;
