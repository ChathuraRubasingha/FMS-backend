const express = require("express"),
  router = express.Router();
const Login = require("../controllers/Login_controller");

router.post("/login", Login.Login);

module.exports = router;
