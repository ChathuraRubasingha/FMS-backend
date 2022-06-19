const express = require("express"),
  router = express.Router();
const Odometer = require("../controllers/Odometer_controller");

router.post("/addodometer", Odometer.AddOdometer);
router.get("/odometer", Odometer.GetOdometer);

module.exports = router;
