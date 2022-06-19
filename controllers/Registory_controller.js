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

exports.GetRegistedVehicles = GetRegistedVehicles;
