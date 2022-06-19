const pool = require("../db");
const express = require("express"),
  router = express.Router();

const AddAccessPermission = (req, res) => {
  console.log(req.body);
  const roleId = req.body.roleId;
  const controllerId = req.body.controllerId;

  pool.query(
    "INSERT INTO access_user_roll (Role_ID,Contoller_ID) VALUES(?,?)",
    [roleId, controllerId],
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
const GetAccessPermission = (req, res) => {
  pool.query(
    "SELECT ma_role.Role_ID, ma_role.Role, access_controllers.Contoller_ID, access_controllers.Display_Name FROM access_user_roll INNER JOIN access_controllers ON access_user_roll.Contoller_ID = access_controllers.Contoller_ID INNER JOIN ma_role ON access_user_roll.Role_ID = ma_role.Role_ID",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
};

const DeleteById = (req, res) => {
  const roleId = req.params.roleId;
  const controllerId = req.params.controllerId;
  console.log(roleId, controllerId);
  pool.query(
    "DELETE FROM access_user_roll WHERE Role_ID = ? AND Contoller_ID=?",
    roleId,
    controllerId,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

exports.AddAccessPermission = AddAccessPermission;
exports.DeleteById = DeleteById;
exports.GetAccessPermission = GetAccessPermission;
