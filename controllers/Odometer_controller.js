const pool = require("../db");
const express = require("express"),
  router = express.Router();

const AddOdometer = (req, res) => {
  console.log(req.body);
  const vehicleNo = req.body.vehicleNo;
  const driverId = req.body.driverId;
  const inTime = req.body.inTime;
  const outTime = req.body.outTime;
  const inOdoReading = req.body.inOdoReading;
  const outOdoReading = req.body.outOdoReading;

  pool.query(
    "INSERT INTO odometer_update (Vehicle_No,Driver_ID, in_time,out_time,in_odo_reading,out_odo_reading) VALUES(?,?,?,?,?,?)",
    [vehicleNo, driverId, inTime, outTime, inOdoReading, outOdoReading],
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
const GetOdometer = (req, res) => {
  pool.query(
    "SELECT Vehicle_No,in_time,out_time,in_odo_reading,out_odo_reading FROM odometer_update",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
};

exports.AddOdometer = AddOdometer;
exports.GetOdometer = GetOdometer;
