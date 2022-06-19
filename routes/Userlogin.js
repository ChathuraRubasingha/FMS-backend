const express = require("express"),
  router = express.Router();
const userLogin = require("../controllers/Login_controller");

router.post("/userLogin", userLogin.UserLogin);

module.exports = router;
