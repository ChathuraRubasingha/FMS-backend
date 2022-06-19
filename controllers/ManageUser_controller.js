const pool = require("../db");
const express = require("express"),
  router = express.Router();

const Addmanageuser = (req, res) => {
  console.log(req.body);
  const fullName = req.body.fullName;
  const userName = req.body.userName;
  const password = req.body.password;
  const email = req.body.email;
  const phoneNo = req.body.phoneNo;
  const designationID = req.body.designationID;
  const roleId = req.body.roleId;
  const locationId = req.body.locationId;

  pool.query(
    "INSERT INTO ma_user (Full_Name, UserName, Password, Email, Mobile,Designation_ID, Role_ID, Location_ID) VALUES(?,?,?,?,?,?,?,?)",
    [
      fullName,
      userName,
      password,
      email,
      phoneNo,
      designationID,
      roleId,
      locationId,
    ],
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
const GetManageUsers = (req, res) => {
  pool.query(
    "SELECT User_ID, UserName, Role_ID, Location_ID FROM ma_user ",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
};

//delete data
const DeleteById = (req, res) => {
  const id = req.params.id;
  console.log(id);
  pool.query("DELETE FROM ma_user WHERE User_ID = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

exports.Addmanageuser = Addmanageuser;
exports.DeleteById = DeleteById;
exports.GetManageUsers = GetManageUsers;
