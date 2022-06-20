const pool = require("../db");
const express = require("express");
router = express.Router();

const Login = (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;

  pool.query(
    "SELECT* FROM tbl_users WHERE username =? AND password =?",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Wrong Username or Password" });
      }
    }
  );
};

exports.Login = Login;
