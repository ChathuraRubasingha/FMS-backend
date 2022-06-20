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
router.delete(
  "/deletetranferedvehicle/:transfer_ID",
  Registory.DeleteTranferedVehicle
);
router.delete("/deleteassigneddriver/:id", Registory.DeleteAssignedDriver);
module.exports = router;

router.put("/updatevehiclereg/:vehicleno", Registory.Updatevehicle);
router.get("/getvehicle/:vehicleno", Registory.GetVehicle);

router.get("/getlocation/:vehicleno", Registory.GetLocation);
router.put(
  "/updateassignedlocation/:vehicleno",
  Registory.UpdateAssignedLocation
);

router.get("/getlocationalone", Registory.GetLocationalone);

router.get(
  "/getdriverassignedvehiclesAll/:Asigned_ID",
  Registory.GetDriverAssignedVehiclesAll
);

router.get(
  "/gettranferedsummerybyaID/:transfer_ID",
  Registory.GetTranferedsummeryByaID
);

router.get("/getAllBookingRequest", Registory.GetAllBookingRequest);

router.get("/getPendingBookingRequest", Registory.GetPendingBookingRequest);

router.get("/getApprovedeBookingRequest", Registory.GetApprovedeBookingRequest);

router.get(
  "/getDisApprovedeBookingRequest",
  Registory.GetDisApprovedeBookingRequest
);

router.get("/getCompletedBookingRequest", Registory.GetCompletedBookingRequest);

router.put("/updatestatus/:id", Registory.UpdateStatus);

router.put(
  "/updateTranferedsummeryByaID/:transfer_ID",
  Registory.UpdateTranferedsummeryByaID
);

router.get(
  "/getTotalIdelVehiclesCountwise",
  Registory.GetTotalIdelVehiclesCountwise
);

router.get("/getAllDrivers", Registory.GetAllDrivers);

router.get("/getAllCatergory", Registory.GetAllCatergory);
router.get("/getAllFuel", Registory.GetAllFuel);
router.get("/getAllTyreSize", Registory.GetAllTyreSize);
router.get("/getAllTyreType", Registory.GetAllTyreType);
router.get("/getAllMake", Registory.GetAllMake);
router.get("/getAllModel", Registory.GetAllModel);

router.get("/getAllBatrey", Registory.GetAllBatrey);
