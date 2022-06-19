const express = require("express"),
  router = express.Router();
const DashboardPermission = require("../controllers/DashboardPermission_controller");

router.post(
  "/adddashboardpermission",
  DashboardPermission.AddDashboardPermission
);
router.delete(
  "/deletedashboardpermission/:roleId, dashboardId",
  DashboardPermission.DeleteById
);
router.get("/dashboardpermission", DashboardPermission.GetDashboardPermission);

module.exports = router;
