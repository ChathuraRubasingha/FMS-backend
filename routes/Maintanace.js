const express = require("express"),
  router = express.Router();
const Maintanace = require("../controllers/Maintanace_controller");


router.get('/maintanance', Maintanace.GetVehicles)
router.get('/vehicleDetails/:id', Maintanace.VehicleDetails)

module.exports = router 
module.exports = router;

