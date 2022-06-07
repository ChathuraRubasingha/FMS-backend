const express = require("express"),
	router = express.Router();
const VehicleDetail = require("../controllers/VehicleDetail_controller");

router.get("/VehicleDetail", VehicleDetail.GetVehicleDetail);

module.exports = router;
