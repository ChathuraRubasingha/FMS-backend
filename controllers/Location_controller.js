const pool = require("../db");
const express = require("express"),
	router = express.Router();

const AddLocation = (req, res) => {
	console.log(req.body);

	const location = req.body.location;

	const address = req.body.address;

	pool.query(
		"INSERT INTO ma_location (Location_Name, Address) VALUES(?,?)",
		[location, address],
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
const GetLocation = (req, res) => {
	pool.query(
		"SELECT  ma_location.Location_Name,    ma_location.Address   FROM   ma_location",
		(err, rows) => {
			if (!err) {
				res.send(rows);
			} else {
				console.log(err);
			}
		}
	);
};

const DeleteById = (req, res) => {
	const id = req.params.id;
	console.log(id);
	pool.query(
		"DELETE FROM ma_location WHERE Location_ID = ?",
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

exports.GetLocation = GetLocation;
exports.AddLocation = AddLocation;
exports.DeleteById = DeleteById;
