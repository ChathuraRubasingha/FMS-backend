const express = require("express"),
  router = express.Router();

const Registory = require("../controllers/Registory_controller");

router.get("/registedVehicles", Registory.GetRegistedVehicles);

module.exports = router;
