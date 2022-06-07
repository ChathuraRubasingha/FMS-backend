const express = require("express"),
  router = express.Router();
const GetFuel = require("../controllers/Fuel_controller");

router.post("/addfuel", GetFuel.Addfuel);
router.post("/addfuelconfirm", GetFuel.Addfuelconfirm);
router.get("/fuelrequest", GetFuel.GetFuelrequest);
router.get("/fueldetails", GetFuel.GetFueldetails);

module.exports = router;
