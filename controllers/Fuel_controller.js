const pool = require("../db");
const express = require("express"),
  router = express.Router();

const UploadBillImage = (req, res) => {
  console.log("Start");
  console.log(req.body);
  const fullName = req.body.fullName;
  const vehicleid = req.body.vehicleid;
  const date = req.body.date;
  const odometer = req.body.odometer;
  const Liters = req.body.Liters;
  const location = req.body.location;
  const amount = req.body.amount;
  var image = null;
  if (req.file != null) {
    image = req.file.path;
  }
  console.log(req.body);
  console.log(image);

  pool.query(
    "INSERT INTO fuel_providing_details(add_by, Vehicle_No,Fuel_Pumped_Date,Fuel_Station, Distance_Driven, Fuel_Amount, Payable_Amount,photo) VALUES(?,?,?,?,?,?,?,?)",
    [fullName, vehicleid, date, location, odometer, Liters, amount, image],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ sucess: true, data: image });
      }
    }
  );
};

const Addfuel = (req, res) => {
  console.log(req.body);
  const driverid = req.body.driverid;
  const vehicleid = req.body.vehicleid;
  const date = req.body.date;
  const odometer = req.body.odometer;
  const Liters = req.body.Liters;

  pool.query(
    "INSERT INTO fuel_request_details(Driver_ID, Vehicle_No,Request_Date, Meter_Reading, Required_Fuel_Capacity) VALUES(?,?,?,?,?)",
    [driverid, vehicleid, date, odometer, Liters],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Success");
      }
    }
  );
};

const Addfuelconfirm = (req, res) => {
  console.log(req.body);

  const fullName = req.body.fullName;
  const location = req.body.location;
  const vehicleid = req.body.vehicleid;
  const date = req.body.date;
  const odometer = req.body.odometer;
  const Liters = req.body.Liters;
  const amount = req.body.amount;

  pool.query(
    "INSERT INTO fuel_providing_details(add_by, Vehicle_No,Fuel_Pumped_Date,Fuel_Station, Distance_Driven, Fuel_Amount, Payable_Amount) VALUES(?,?,?,?,?,?,?)",
    [fullName, vehicleid, date, location, odometer, Liters, amount],
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
const GetFuelrequest = (req, res) => {
  pool.query(
    "SELECT fuel_request_details.Vehicle_No,ma_driver.Full_Name,fuel_request_details.Driver_ID, fuel_request_details.Request_Date, fuel_request_details.Meter_Reading,fuel_request_details.Required_Fuel_Capacity,fuel_request_details.Approve_Status FROM fuel_request_details INNER JOIN ma_driver ON fuel_request_details.Driver_ID = ma_driver.Driver_ID",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
};

const GetFueldetails = (req, res) => {
  pool.query(
    "SELECT fuel_providing_details.add_by, fuel_providing_details.Fuel_Pumped_Date, fuel_providing_details.Fuel_Station, fuel_providing_details.Vehicle_No, fuel_providing_details.Distance_Driven, fuel_providing_details.Fuel_Amount, fuel_providing_details.Payable_Amount , fuel_providing_details.photo FROM fuel_providing_details",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
};

exports.GetFuelrequest = GetFuelrequest;
exports.GetFueldetails = GetFueldetails;
exports.Addfuel = Addfuel;
exports.Addfuelconfirm = Addfuelconfirm;
exports.UploadBillImage = UploadBillImage;
