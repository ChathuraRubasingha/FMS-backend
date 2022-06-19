const express = require("express"),
  router = express.Router();
const AccessPermission = require("../controllers/AccessPermission_controller");

router.post("/addaccesspermission", AccessPermission.AddAccessPermission);
router.delete(
  "/deleteaccesspermission/:roleId, controllerId",
  AccessPermission.DeleteById
);
router.get("/accesspermission", AccessPermission.GetAccessPermission);

module.exports = router;
