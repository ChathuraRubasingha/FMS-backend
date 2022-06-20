const express = require("express"),
  router = express.Router();
const ManageUser = require("../controllers/ManageUser_controller");

router.post("/addmanageuser", ManageUser.Addmanageuser);
router.get("/manageusers", ManageUser.GetManageUsers);
router.delete("/deletemanageuser/:id", ManageUser.DeleteById);

module.exports = router;
