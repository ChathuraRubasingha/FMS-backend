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
  pool.query(
    "SELECT ma_location.Location_Name,  ma_vehicle_registry.Vehicle_No,  ma_vehicle_category.Category_Name,  vehicle_transfer.From_Date, vehicle_transfer.To_Date FROM vehicle_location INNER JOIN ma_vehicle_registry ON vehicle_location.Vehicle_No = ma_vehicle_registry.Vehicle_No INNER JOIN ma_location ON vehicle_location.Current_Location_ID = ma_location.Location_ID INNER JOIN ma_vehicle_category ON ma_vehicle_registry.Vehicle_Category_ID = ma_vehicle_category.Vehicle_Category_ID INNER JOIN vehicle_transfer ON vehicle_location.Vehicle_No = vehicle_transfer.Vehicle_No",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
};

const GetDriverAssignedVehicles = (req, res) => {
  pool.query(
    "SELECT ma_driver.Full_Name,  vehicle_driver.Vehicle_No,  ma_vehicle_category.Category_Name, ma_location.Location_Name,  vehicle_location.From_Date,  vehicle_location.To_Date FROM vehicle_driver INNER JOIN ma_driver ON vehicle_driver.Driver_ID = ma_driver.Driver_ID INNER JOIN vehicle_location ON ma_driver.Driver_ID = vehicle_location.Driver_ID INNER JOIN ma_location ON ma_driver.Location_ID = ma_location.Location_ID INNER JOIN ma_vehicle_registry ON vehicle_location.Vehicle_No = ma_vehicle_registry.Vehicle_No INNER JOIN ma_vehicle_category ON ma_vehicle_registry.Vehicle_Category_ID = ma_vehicle_category.Vehicle_Category_ID",
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

const RegisterVehicle = (req, res) => {
  console.log(req.body);
  const VehicleNo = req.body.VehicleNo;
  const RegistrationFee = req.body.RegistrationFee;
  const VehicleCategoryID = req.body.VehicleCategoryID;
  const PurchaseValue = req.body.PurchaseValue;
  const EngineNo = req.body.EngineNo;
  const ChassisNo = req.body.ChassisNo;
  const DriverID = req.body.DriverID;
  const FuelTypeID = req.body.FuelTypeID;
  const TyreSizeID = req.body.TyreSizeID;
  const TyreTypeID = req.body.TyreTypeID;
  const MakeID = req.body.MakeID;
  const ModelID = req.body.ModelID;
  const BatteryTypeID = req.body.BatteryTypeID;
  const VehicleStatusID = req.body.VehicleStatusID;
  const AllocationTypeID = req.body.AllocationTypeID;

  pool.query(
    "INSERT INTO ma_vehicle_registry (Vehicle_No,Registration_Fee, Vehicle_Category_ID,Purchase_Value, Engine_No, Chassis_No,Driver_ID,Fuel_Type_ID,Tyre_Size_ID,Tyre_Type_ID,Make_ID,Model_ID,Battery_Type_ID,Vehicle_Status_ID,Allocation_Type_ID) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
    [
      VehicleNo,
      RegistrationFee,
      VehicleCategoryID,
      PurchaseValue,
      EngineNo,
      ChassisNo,
      DriverID,
      FuelTypeID,
      TyreSizeID,
      TyreTypeID,
      MakeID,
      ModelID,
      BatteryTypeID,
      VehicleStatusID,
      AllocationTypeID,
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

const DeleteTranferedVehicle = (req, res) => {
  const id = req.params.id;
  console.log(id);
  pool.query(
    "DELETE FROM vehicle_transfer WHERE From_Location_ID = ?",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

const DeleteVehicle = (req, res) => {
  const id = req.params.id;
  console.log(id);
  pool.query(
    "DELETE FROM ma_vehicle_registry WHERE Vehicle_No = ?",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

const DeleteAssignedDriver = (req, res) => {
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

const DeleteAssignedLocation = (req, res) => {
  const id = req.params.id;
  console.log(id);
  pool.query(
    "DELETE FROM ma_location WHERE Location_Name = ?",
    id,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
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
exports.RegisterVehicle = RegisterVehicle;

exports.DeleteAssignedLocation = DeleteAssignedLocation;
exports.DeleteTranferedVehicle = DeleteTranferedVehicle;
exports.DeleteAssignedDriver = DeleteAssignedDriver;
exports.DeleteVehicle = DeleteVehicle;
