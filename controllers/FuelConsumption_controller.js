const pool = require("../db");
const express = require("express"),
	router = express.Router();

// get data from database
const GetFuelConsumption = (req, res) => {
	pool.query(
		"SELECT ma_vehicle_registry.Vehicle_No,	ma_vehicle_category.Category_Name,	ma_make.Make,	ma_model.Model,	ma_fuel_type.Fuel_Type	FROM ma_make ,	ma_vehicle_registry	INNER JOIN ma_vehicle_category ON ma_vehicle_category.Vehicle_Category_ID = ma_vehicle_registry.Vehicle_Category_ID	INNER JOIN ma_model ON ma_vehicle_registry.Model_ID = ma_model.Model_ID	INNER JOIN ma_fuel_type ON ma_fuel_type.Fuel_Type_ID = ma_vehicle_registry.Fuel_Type_ID",
		(err, rows) => {
			if (!err) {
				res.send(rows);
			} else {
				console.log(err);
			}
		}
	);
};

exports.GetFuelConsumption = GetFuelConsumption;
