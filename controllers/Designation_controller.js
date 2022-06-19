const pool = require("../db");
const express = require("express"),
	router = express.Router();

const Add_Designation = (req, res) => {
	console.log(req.body);
	const designation = req.body.designation;

	pool.query(
		"INSERT INTO ma_designation (Designation) VALUES(?)",
		[designation],
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
const GetDesignation = (req, res) => {
	pool.query(
		"SELECT   ma_designation.Designation   FROM ma_designation",
		(err, rows) => {
			if (!err) {
				res.send(rows);
			} else {
				console.log(err);
			}
		}
	);
};

delete data;
const DeleteById = (req, res) => {
	const id = req.params.id;
	console.log(id);
	pool.query(
		"DELETE FROM ma_designation WHERE Designation_ID = ?",
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

exports.Add_Designation = Add_Designation;
exports.DeleteById = DeleteById;
exports.GetDesignation = GetDesignation;
