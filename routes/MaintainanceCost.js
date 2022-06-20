const express = require("express"),
	router = express.Router();
const MaintainanceCost = require("../controllers/MaintainanceCost_controller");

router.get("/MaintainanceCost", MaintainanceCost.GetMaintainanceCost);

module.exports = router;
