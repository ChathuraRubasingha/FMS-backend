const express = require("express"),
	router = express.Router();
const Modal = require("../controllers/Modal_controller");

router.post("/addModal", Modal.AddModal);
router.get("/getModal", Modal.GetModal);
router.delete("/deleteModal/:id", Modal.DeleteById);

module.exports = router;
