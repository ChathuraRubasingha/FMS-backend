const express = require("express"),
  router = express.Router();
const Maintanace = require("../controllers/Maintanace_controller");


router.get('/maintanance', Maintanace.GetVehicles)//
router.get('/vehicleDetails/:id', Maintanace.VehicleDetails)
router.post('/addservice', Maintanace.AddService)
router.get('/serviceStation', Maintanace.GetServiceStation)
router.get('/serviceType', Maintanace.GetServiceType)
router.get('/serviceDetails/:id', Maintanace.GetServiceDetails)

module.exports = router 
module.exports = router;

