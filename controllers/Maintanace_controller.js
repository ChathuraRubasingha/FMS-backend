const pool = require("../db");
const express = require("express"),
  router = express.Router();

const GetVehicles = (req, res) => {
  pool.query(
    "SELECT ma_vehicle_registry.Vehicle_No,ma_vehicle_category.Category_Name,ma_location.Location_Name,ma_make.Make,ma_fuel_type.Fuel_Type,ma_tyre_size.Tyre_Size FROM ma_vehicle_category INNER JOIN ma_vehicle_registry ON ma_vehicle_registry.Vehicle_Category_ID = ma_vehicle_category.Vehicle_Category_ID INNER JOIN ma_fuel_type ON ma_vehicle_registry.Fuel_Type_ID = ma_fuel_type.Fuel_Type_ID INNER JOIN ma_location ON ma_vehicle_registry.Location_ID = ma_location.Location_ID INNER JOIN ma_tyre_size ON ma_vehicle_registry.Tyre_Size_ID = ma_tyre_size.Tyre_Size_ID INNER JOIN ma_make ON ma_vehicle_registry.Make_ID = ma_make.Make_ID",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
};

exports.GetVehicles = GetVehicles;
