const express = require("express"),
	router = express.Router();
const Branch = require("../controllers/Branch_controller");

router.post("/addBranch", Branch.AddBranch);
router.get("/Branch", Branch.GetBranch);
router.delete("/deleteBranch/:id", Branch.DeleteById);
router.get("/ViewBranch/:id", Branch.ViewBranch);

module.exports = router;
