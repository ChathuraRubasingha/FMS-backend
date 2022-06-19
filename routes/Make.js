const express = require("express"),
	router = express.Router();
const Make = require("../controllers/Make_controller");

router.post("/addmake", Make.AddMake);
router.get("/make", Make.GetMake);
router.delete("/deleteMake/:id", Make.DeleteById);

module.exports = router;
