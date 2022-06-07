const pool = require("../db");
const express = require("express"),
  router = express.Router();

const GetRegistedVehicles = (req, res) => {
  pool.query(
    "SELECT ma_vehicle_registry.Vehicle_No,ma_vehicle_category.Category_Name,ma_make.Make,ma_allocation_type.Allocation_Type_ID,ma_vehicle_status.Vehicle_Status,ma_location.Location_Name FROM ma_vehicle_registry INNER JOIN ma_vehicle_category ON ma_vehicle_registry.Vehicle_Category_ID = ma_vehicle_category.Vehicle_Category_ID INNER JOIN ma_make ON ma_vehicle_registry.Make_ID = ma_make.Make_ID INNER JOIN ma_allocation_type ON ma_vehicle_registry.Allocation_Type_ID = ma_allocation_type.Allocation_Type_ID INNER JOIN ma_vehicle_status ON ma_vehicle_registry.Vehicle_Status_ID = ma_vehicle_status.Vehicle_Status_ID INNER JOIN ma_location ON ma_vehicle_registry.Location_ID = ma_location.Location_ID",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
};

const GetLocationUnAssignedVehicles = (req, res) => {
  pool.query(
    "SELECT ma_vehicle_registry.Vehicle_No,ma_vehicle_category.Category_Name,ma_make.Make,vehicle_booking.Requested_Date FROM ma_vehicle_registry INNER JOIN ma_vehicle_category ON ma_vehicle_registry.Vehicle_Category_ID = ma_vehicle_category.Vehicle_Category_ID INNER JOIN ma_make ON ma_vehicle_registry.Make_ID = ma_make.Make_ID INNER JOIN vehicle_booking ON ma_vehicle_category.Vehicle_Category_ID = vehicle_booking.Vehicle_Category_ID",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
};

const GetLocationAssignedVehicles = (req, res) => {
  pool.query("", (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
};

const GetDriverAssignedVehicles = (req, res) => {
  pool.query(
    "SELECT ma_driver.Full_Name,ma_vehicle_registry.Vehicle_No, ma_vehicle_category.Category_Name, ma_location.Location_Name, vehicle_driver.From_Date,vehicle_driver.To_Date FROM ma_driver INNER JOIN ma_vehicle_registry ON ma_driver.Driver_ID = ma_vehicle_registry.Driver_ID INNER JOIN ma_vehicle_category ON ma_vehicle_registry.Vehicle_Category_ID = ma_vehicle_category.Vehicle_Category_ID INNER JOIN ma_location ON ma_vehicle_registry.Location_ID = ma_location.Location_ID INNER JOIN vehicle_driver ON ma_vehicle_registry.Vehicle_No = vehicle_driver.Vehicle_No",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
};

const GetDriverUnAssignedVehicles = (req, res) => {
  pool.query(
    "SELECT vehicle_location.Location_ID, ma_vehicle_registry.Vehicle_No, ma_vehicle_category.Category_Name FROM ma_vehicle_registry INNER JOIN vehicle_location ON ma_vehicle_registry.Location_ID = vehicle_location.Location_ID INNER JOIN ma_vehicle_category ON ma_vehicle_registry.Vehicle_Category_ID = ma_vehicle_category.Vehicle_Category_ID",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
};

const GetTransferSummary = (req, res) => {
  pool.query(
    "SELECT vehicle_transfer.From_Location_ID, vehicle_transfer.To_Location_ID, vehicle_location.From_Date,vehicle_location.To_Date FROM vehicle_transfer INNER JOIN vehicle_location ON vehicle_transfer.Vehicle_No = vehicle_location.Vehicle_No",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
};

const GetNotTransferSummary = (req, res) => {
  pool.query(
    "SELECT ma_location.Location_Name,  vehicle_transfer.Vehicle_No,  ma_vehicle_category.Category_Name,  vehicle_location.From_Date,  vehicle_location.To_Date FROM vehicle_transfer INNER JOIN vehicle_location ON  vehicle_transfer.Vehicle_No = vehicle_location.Vehicle_No INNER JOIN ma_location ON vehicle_location.Location_ID = ma_location.Location_ID INNER JOIN ma_vehicle_category INNER JOIN ma_vehicle_registry ON  ma_vehicle_category.Vehicle_Category_ID = ma_vehicle_registry.Vehicle_Category_ID AND vehicle_transfer.Vehicle_No = ma_vehicle_registry.Vehicle_No",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
};

exports.GetRegistedVehicles = GetRegistedVehicles;
exports.GetLocationUnAssignedVehicles = GetLocationUnAssignedVehicles;
exports.GetLocationAssignedVehicles = GetLocationAssignedVehicles;
exports.GetDriverAssignedVehicles = GetDriverAssignedVehicles;
exports.GetDriverUnAssignedVehicles = GetDriverUnAssignedVehicles;
exports.GetTransferSummary = GetTransferSummary;
exports.GetNotTransferSummary = GetNotTransferSummary;
