const express = require("express"),
router = express.Router();
const RegistedVehicle = require("../controllers/summary_controller");

router.get('/registedVehicle', RegistedVehicle.GetRegisterdVehicle)
router.get('/allocatedVehicle', RegistedVehicle.GetAllocatedVehicle)
router.get('/poolVehicle', RegistedVehicle.GetPoolVehicle)
router.get('/accidentVehicle', RegistedVehicle.GetAccidentVehicle)
router.get('/registerd', RegistedVehicle.Registerd)
router.get('/allocated', RegistedVehicle.Allocated)

module.exports = router;