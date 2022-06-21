const pool = require("../db");
const express = require("express"),
	router = express.Router();

const AddFuelType = (req, res) => {
	console.log(req.body);
	const FuelType = req.body.FuelType;

	pool.query(
		"INSERT INTO ma_fuel_type (Fuel_Type) VALUES(?)",
		[FuelType],
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
const GetFuelType = (req, res) => {
	pool.query(
		"SELECT ma_fuel_type.Fuel_Type, Fuel_Type_ID FROM ma_fuel_type",
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
const GetFuelType_D = (req, res) => {
	const id = req.params.id;
	pool.query(
		"SELECT * FROM ma_fuel_type WHERE Fuel_Type_ID = ?",
		id,
		(err, result) => {
			if (err) {
				res.status(400).send(err);
			} else {
				res.send(result[0]);
			}
		}
	);
};

const UpdateFuelType = (req, res) => {
	const id = req.params.id;
	const { FuelType } = req.body;
	console.log(FuelType);

	pool.query(
		"UPDATE ma_fuel_type SET Fuel_Type = ? WHERE Fuel_Type_ID = ?",
		[FuelType, id],
		(err, result) => {
			if (err) {
				res.status(400).send(err);
			} else {
				res.send({
					msg: "User updated successfully"
				});
			}
		}
	);
};

const DeleteById = (req, res) => {
	const id = req.params.id;
	console.log(id);
	pool.query(
		"DELETE FROM ma_fuel_type WHERE Fuel_Type_ID = ?",
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
exports.AddFuelType = AddFuelType;
exports.DeleteById = DeleteById;
exports.GetFuelType = GetFuelType;
exports.GetFuelType = GetFuelType;
exports.UpdateFuelType = UpdateFuelType;
exports.AddFuelType = AddFuelType;
exports.DeleteById = DeleteById;
exports.GetFuelType_D = GetFuelType_D;
