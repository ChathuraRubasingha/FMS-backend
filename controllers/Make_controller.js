const pool = require("../db");
const express = require("express"),
	router = express.Router();

const AddMake = (req, res) => {
	console.log(req.body);
	const make = req.body.make;

	pool.query("INSERT INTO ma_make (Make) VALUES(?)", [make], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send("Success");
		}
	});
};

// get data from database
const GetMake = (req, res) => {
	pool.query("SELECT  ma_make.Make  FROM  ma_make   ", (err, rows) => {
		if (!err) {
			res.send(rows);
		} else {
			console.log(err);
		}
	});
};

//delete data
const DeleteById = (req, res) => {
	const id = req.params.id;
	console.log(id);
	pool.query("DELETE FROM ma_make WHERE Make_ID = ?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
};

exports.AddMake = AddMake;
exports.DeleteById = DeleteById;
exports.GetMake = GetMake;
