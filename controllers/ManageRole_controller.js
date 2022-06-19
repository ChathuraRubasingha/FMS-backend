const pool = require("../db");
const express = require("express"),
  router = express.Router();

const AddManageRole = (req, res) => {
  console.log(req.body);
  const roleName = req.body.roleName;

  pool.query(
    "INSERT INTO ma_role (Role) VALUES(?)",
    [roleName],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Success");
      }
    }
  );
};

// get data from database
const GetManageRoles = (req, res) => {
  pool.query("SELECT Role_ID, Role FROM ma_role", (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
};

//delete data
const DeleteByRole = (req, res) => {
  const role = req.params.role;
  console.log(role);
  pool.query("DELETE FROM ma_role WHERE Role = ?", role, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

exports.AddManageRole = AddManageRole;
exports.DeleteByRole = DeleteByRole;
exports.GetManageRoles = GetManageRoles;
