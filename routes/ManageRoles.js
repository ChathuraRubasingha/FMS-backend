const express = require("express"),
  router = express.Router();
const ManageRoles = require("../controllers/ManageRole_controller");

router.post("/addmanagerole", ManageRoles.AddManageRole);
router.get("/manageroles", ManageRoles.GetManageRoles);
router.delete("/deletemanagerole/:role", ManageRoles.DeleteByRole);

module.exports = router;
