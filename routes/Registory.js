const express = require("express"),
  router = express.Router();

const Registory = require("../controllers/Registory_controller");

router.get("/registedVehicles", Registory.GetRegistedVehicles);

router.get(
  "/getlocationunassignedvehicles",
  Registory.GetLocationUnAssignedVehicles
);

router.get(
  "/getlocationassignedvehicles",
  Registory.GetLocationAssignedVehicles
);

router.get("/getdriverassignedvehicles", Registory.GetDriverAssignedVehicles);
router.get(
  "/getdriverunassignedvehicles",
  Registory.GetDriverUnAssignedVehicles
);

router.get("/gettransfersummary", Registory.GetTransferSummary);

router.get("/getnottransfersummary", Registory.GetNotTransferSummary);

router.post("/registervehicle", Registory.RegisterVehicle);

router.delete("/deletevehicle/:id", Registory.DeleteVehicle);
router.delete("/deleteassignedlocation/:id", Registory.DeleteAssignedLocation);
router.delete("/deletetranferedvehicle/:id", Registory.DeleteTranferedVehicle);
router.delete("/deleteassigneddriver/:id", Registory.DeleteAssignedDriver);

module.exports = router;
