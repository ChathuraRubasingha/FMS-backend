const express = require("express"),
	router = express.Router();
const FuelType = require("../controllers/FuelType_controller");

router.post("/addFuelType", FuelType.AddFuelType);
router.get("/getFuelType", FuelType.GetFuelType);
router.get("/FuelType/:id", FuelType.GetFuelType_D);
router.put("/FuelType/:id", FuelType.UpdateFuelType);
router.delete("/deleteFuelType/:id", FuelType.DeleteById);

module.exports = router;
