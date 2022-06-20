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
    "SELECT ma_location.Location_Name,  ma_vehicle_registry.Vehicle_No,  ma_vehicle_category.Category_Name,  vehicle_location.From_Date, vehicle_location.To_Date FROM vehicle_location INNER JOIN ma_vehicle_registry ON vehicle_location.Vehicle_No = ma_vehicle_registry.Vehicle_No INNER JOIN ma_location ON vehicle_location.Current_Location_ID = ma_location.Location_ID INNER JOIN ma_vehicle_category ON ma_vehicle_registry.Vehicle_Category_ID = ma_vehicle_category.Vehicle_Category_ID INNER JOIN vehicle_transfer ON vehicle_location.Vehicle_No = vehicle_transfer.Vehicle_No",
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
  pool.query("SELECT * FROM `driver_assigned`", (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
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
  pool.query("SELECT * FROM `vehicle_transfer_new` ", (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
};

const GetNotTransferSummary = (req, res) => {
  pool.query(
    "SELECT from_location,to_location,from_date,to_date,transfer_status FROM `vehicle_transfer_new` WHERE transfer_status='not yet'",
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
  const transfer_ID = req.params.transfer_ID;
  console.log(transfer_ID);
  pool.query(
    "DELETE FROM vehicle_transfer_new WHERE transfer_ID = ?",
    transfer_ID,
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
  pool.query(
    "DELETE FROM driver_assigned WHERE Asigned_ID = ?",
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

const GetVehicle = (req, res) => {
  const vehicleno = req.params.vehicleno;
  pool.query(
    "SELECT * FROM ma_vehicle_registry WHERE Vehicle_No = ?",
    vehicleno,
    (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(result[0]);
      }
    }
  );
};

const Updatevehicle = (req, res) => {
  const vehicleno = req.params.vehicleno;
  const {
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
  } = req.body;

  pool.query(
    "UPDATE ma_vehicle_registry SET Vehicle_No = ?, Registration_Fee = ?, Vehicle_Category_ID = ?, Purchase_Value = ?, Engine_No = ?, Chassis_No = ?, Driver_ID = ?, Fuel_Type_ID = ?, Tyre_Size_ID = ?, Tyre_Type_ID = ?, Make_ID = ?, Model_ID = ?, Battery_Type_ID = ?, Vehicle_Status_ID = ?, Allocation_Type_ID = ? WHERE Vehicle_No = ?",
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
      vehicleno,
    ],
    (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send({
          msg: "Vehicle updated successfully",
        });
      }
    }
  );
};

const GetLocation = (req, res) => {
  const vehicleno = req.params.vehicleno;
  pool.query(
    "SELECT Location_ID,From_Date,To_Date FROM vehicle_location WHERE Vehicle_No = ?",
    vehicleno,
    (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(result[0]);
      }
    }
  );
};

const UpdateAssignedLocation = (req, res) => {
  const vehicleno = req.params.vehicleno;
  const { LocationID, FromDate, ToDate } = req.body;

  pool.query(
    "UPDATE vehicle_location SET Location_ID = ?,  From_Date = ?, To_Date = ? WHERE Vehicle_No = ?",
    [LocationID, FromDate, ToDate, vehicleno],
    (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send({
          msg: "Vehicle updated successfully",
        });
      }
    }
  );
};

const GetLocationalone = (req, res) => {
  pool.query(
    "SELECT Location_ID, Location_Name FROM ma_location",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
};

const GetDriverAssignedVehiclesAll = (req, res) => {
  const Asigned_ID = req.params.Asigned_ID;
  console.log(Asigned_ID);
  pool.query(
    "SELECT * FROM `driver_assigned`  WHERE Asigned_ID = ?",
    Asigned_ID,
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
};

const GetTranferedsummeryByaID = (req, res) => {
  const transfer_ID = req.params.transfer_ID;

  console.log(transfer_ID);
  pool.query(
    "SELECT from_location,to_location,from_date,to_date,transfer_status FROM `vehicle_transfer_new` WHERE transfer_ID = ?",
    transfer_ID,
    (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(result[0]);
      }
    }
  );
};

const UpdateTranferedsummeryByaID = (req, res) => {
  const transfer_ID = req.params.transfer_ID;
  const { from_location, to_location, from_date, to_date, transfer_status } =
    req.body;

  pool.query(
    "UPDATE vehicle_transfer_new SET from_location = ?,  to_location = ?, from_date = ?,to_date = ? ,transfer_status = ?  WHERE transfer_ID = ?",
    [
      from_location,
      to_location,
      from_date,
      to_date,
      transfer_status,
      transfer_ID,
    ],
    (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send({
          msg: "Vehicle updated successfully",
        });
      }
    }
  );
};

const GetAllBookingRequest = (req, res) => {
  pool.query("SELECT * FROM `vehicle_booking`", (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
};

const GetPendingBookingRequest = (req, res) => {
  pool.query(
    "SELECT * FROM `vehicle_booking` WHERE Booking_Status='Pending'",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
};

const GetApprovedeBookingRequest = (req, res) => {
  pool.query(
    "SELECT * FROM `vehicle_booking` WHERE Booking_Status='Approved'",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
};

const GetDisApprovedeBookingRequest = (req, res) => {
  pool.query(
    "SELECT * FROM `vehicle_booking` WHERE Booking_Status='Disapproved'",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
};

const GetCompletedBookingRequest = (req, res) => {
  pool.query(
    "SELECT * FROM `vehicle_booking` WHERE Booking_Status='Completed'",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
};

const UpdateStatus = (req, res) => {
  const id = req.params.id;
  const { Approve_status } = req.body;
  console.log(Approve_status + " " + id);
  pool.query(
    "UPDATE vehicle_booking SET Booking_Status= ? WHERE Booking_Request_ID = ?",
    [Approve_status, id],
    (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send({
          msg: "Status updated successfully",
        });
      }
    }
  );
};

const GetTotalIdelVehiclesCountwise = (req, res) => {
  pool.query(
    "SELECT ma_vehicle_category.Category_Name, Count(ma_vehicle_registry.Vehicle_No) FROM ma_vehicle_registry INNER JOIN ma_vehicle_category ON ma_vehicle_registry.Vehicle_Category_ID = ma_vehicle_category.Vehicle_Category_ID INNER JOIN vehicle_transfer ON ma_vehicle_registry.Vehicle_No = vehicle_transfer.Vehicle_No WHERE vehicle_transfer.To_Date < CURDATE() GROUP BY ma_vehicle_category.Category_Name",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
};

const GetAllDrivers = (req, res) => {
  pool.query(
    "SELECT Driver_ID, Full_Name, NIC, Mobile, Private_Address FROM ma_driver",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
};

const GetAllCatergory = (req, res) => {
  pool.query("SELECT * FROM `ma_vehicle_category`", (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
};

const GetAllFuel = (req, res) => {
  pool.query("SELECT * FROM `ma_fuel_type`", (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
};

const GetAllTyreSize = (req, res) => {
  pool.query("SELECT * FROM `ma_tyre_size`", (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
};

const GetAllTyreType = (req, res) => {
  pool.query("SELECT * FROM `ma_tyre_type`", (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
};

const GetAllMake = (req, res) => {
  pool.query("SELECT * FROM `ma_make`", (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
};

const GetAllModel = (req, res) => {
  pool.query("SELECT * FROM `ma_model`", (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
};

const GetAllBatrey = (req, res) => {
  pool.query("SELECT * FROM `ma_battery_type`", (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
};

const GetVehicleStatus = (req, res) => {
  pool.query("SELECT * FROM `ma_vehicle_status`", (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
};

const GetAllocationType = (req, res) => {
  pool.query("SELECT * FROM `ma_allocation_type`", (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
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

exports.GetVehicle = GetVehicle;
exports.Updatevehicle = Updatevehicle;

exports.GetLocation = GetLocation;
exports.UpdateAssignedLocation = UpdateAssignedLocation;

exports.GetLocationalone = GetLocationalone;

exports.GetDriverAssignedVehiclesAll = GetDriverAssignedVehiclesAll;
exports.GetTranferedsummeryByaID = GetTranferedsummeryByaID;
exports.GetAllBookingRequest = GetAllBookingRequest;

exports.GetPendingBookingRequest = GetPendingBookingRequest;

exports.GetApprovedeBookingRequest = GetApprovedeBookingRequest;

exports.GetDisApprovedeBookingRequest = GetDisApprovedeBookingRequest;

exports.GetCompletedBookingRequest = GetCompletedBookingRequest;

exports.UpdateStatus = UpdateStatus;
exports.UpdateTranferedsummeryByaID = UpdateTranferedsummeryByaID;

exports.GetTotalIdelVehiclesCountwise = GetTotalIdelVehiclesCountwise;

exports.GetAllDrivers = GetAllDrivers;
exports.GetAllCatergory = GetAllCatergory;
exports.GetAllFuel = GetAllFuel;
exports.GetAllTyreSize = GetAllTyreSize;
exports.GetAllTyreType = GetAllTyreType;
exports.GetAllMake = GetAllMake;
exports.GetAllModel = GetAllModel;
exports.GetAllBatrey = GetAllBatrey;
exports.GetVehicleStatus = GetVehicleStatus;
exports.GetAllocationType = GetAllocationType;
