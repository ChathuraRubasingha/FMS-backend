const express = require("express"),
  router = express.Router();
const GetAccident = require("../controllers/Accident_controller");

router.get("/accident", GetAccident.GetAccidentDetails);
router.post("/addaccident", GetAccident.AddAccident);

module.exports = router;
