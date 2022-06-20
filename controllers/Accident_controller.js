const pool = require("../db");
const express = require("express"),
  router = express.Router();

const UploadImage = (req, res) => {
  console.log(req.body);
  const driverid = req.body.driverid;
  const vehicleid = req.body.vehicleid;
  const date = req.body.date;
  const location = req.body.location;
  const odometer = req.body.odometer;
  const police = req.body.police;
  var image = null;
  if (req.file != null) {
    image = req.file.path;
  }
  pool.query(
    "INSERT INTO accident(Driver_ID, Vehicle_No,Date_and_Time,Accident_Place, Odometer_After_Accident, Police_Station,photo) VALUES(?,?,?,?,?,?,?)",
    [driverid, vehicleid, date, location, odometer, police, image],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ sucess: true, data: image });
      }
    }
  );
};

const AddAccident = (req, res) => {
  console.log(req.body);
  const driverid = req.body.driverid;
  const vehicleid = req.body.vehicleid;
  const date = req.body.date;
  const location = req.body.location;
  const odometer = req.body.odometer;
  const police = req.body.police;
  var image = null;
  if (req.file != null) {
    image = req.file.path;
  }
  console.log(image);
  pool.query(
    "INSERT INTO accident(Driver_ID, Vehicle_No,Date_and_Time,Accident_Place, Odometer_After_Accident, Police_Station,photo) VALUES(?,?,?,?,?,?,?)",
    [driverid, vehicleid, date, location, odometer, police, image],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Success");
      }
    }
  );
};

//rishies back end
const GetAccidentDetails = (req, res) => {
  pool.query(
    "SELECT accident.Vehicle_No,accident.photo,accident.Driver_ID,accident.Date_and_Time,accident.Accident_Place,accident.Police_Station,accident.Odometer_After_Accident FROM accident",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
};

exports.GetAccidentDetails = GetAccidentDetails;
exports.AddAccident = AddAccident;
exports.UploadImage = UploadImage;
