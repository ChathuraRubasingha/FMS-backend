const express = require("express"),
  router = express.Router();

const Projectdetails = require("../controllers/Project_controller");

router.get("/getproject", Projectdetails.GetProjectdetails);
router.post("/addproject", Projectdetails.Addproject);
router.put("/updateproject/:id", Projectdetails.UpdateProject);
router.get("/getprojects/:id", Projectdetails.Getproject);
router.put("/updatestatus/:id", Projectdetails.UpdateStatus);
router.delete("/deleteproject/:id", Projectdetails.DeleteProject);

module.exports = router;
