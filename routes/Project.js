const express = require("express"),
  router = express.Router();

const GetProjectdetails = require("../controllers/Project_controller");
const Addproject = require("../controllers/Project_controller");
const DeleteById = require("../controllers/Project_controller");

router.get("/getproject", GetProjectdetails.GetProjectdetails);
router.post("/addproject", Addproject.Addproject);
router.delete("/deleteproject/:id", DeleteById.DeleteById);

module.exports = router;
