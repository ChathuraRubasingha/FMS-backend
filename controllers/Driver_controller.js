const pool = require("../db");
const express = require("express"),
  router = express.Router();

const Adddriver = (req, res) => {
  console.log(req.body);
  const callingName = req.body.callingName;
  const fullName = req.body.fullName;
  const location = req.body.location;
  const nic = req.body.nic;
  const status = req.body.status;
  const mobile = req.body.mobile;
  const address = req.body.address;
  const image = req.body.image;

  pool.query(
    "INSERT INTO ma_driver (Full_Name, Complete_Name, Location_ID, NIC, Status, Mobile, Private_Address, Driver_Image) VALUES(?,?,?,?,?,?,?,?)",
    [callingName, fullName, location, nic, status, mobile, address, image],
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
const GetDrivers = (req, res) => {
  pool.query(
    "SELECT Driver_ID, Full_Name, NIC, Mobile FROM ma_driver",
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
  pool.query("DELETE FROM ma_driver WHERE Driver_ID = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

exports.Adddriver = Adddriver;
exports.DeleteById = DeleteById;
exports.GetDrivers = GetDrivers;
