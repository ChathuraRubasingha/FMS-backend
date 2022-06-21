const express = require("express"),
	router = express.Router();
const Location = require("../controllers/Location_controller");

router.post("/addLocation", Location.AddLocation);
router.get("/Location", Location.GetLocation);
router.delete("/deleteLocation/:id", Location.DeleteById);

router.get("/ViewLocation/:id", Location.ViewLocation);

module.exports = router;
