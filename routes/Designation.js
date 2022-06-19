const express = require("express"),
	router = express.Router();
const Designation = require("../controllers/Designation_controller");

router.post("/addDesignation", Designation.Add_Designation);
router.get("/designation", Designation.GetDesignation);
// router.delete('/deletedriver/:id', Driver.DeleteById)

module.exports = router;
