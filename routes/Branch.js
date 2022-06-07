const express = require("express"),
	router = express.Router();
const Branch = require("../controllers/Branch_controller");

router.post("/addBranch", Branch.AddBranch);
router.get("/Branch", Branch.GetBranch);
// router.delete("/deletedriver/:id", Branch.DeleteById);

module.exports = router;
