const express = require("express"),
	router = express.Router();
const FuelConsumption = require("../controllers/FuelConsumption_controller");

router.get("/FuelConsumption", FuelConsumption.GetFuelConsumption);

module.exports = router;
