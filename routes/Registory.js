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

router.get(
  "/getlocationunassignedvehicles",
  Registory.GetLocationUnAssignedVehicles
);

router.get("/getdriverassignedvehicles", Registory.GetDriverAssignedVehicles);
router.get(
  "/getdriverunassignedvehicles",
  Registory.GetDriverUnAssignedVehicles
);

router.get("/gettransfersummary", Registory.GetTransferSummary);
module.exports = router;

router.get("/getnottransfersummary", Registory.GetNotTransferSummary);
module.exports = router;
