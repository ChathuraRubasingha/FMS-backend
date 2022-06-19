const pool = require("../db");
const express = require("express"),
	router = express.Router();

const AddModal = (req, res) => {
	console.log(req.body);
	const modal = req.body.modal;
	const makeid = req.body.makeid;

	pool.query(
		"INSERT INTO ma_model  (Model,Make_ID) VALUES(?,?)",
		[modal, makeid],
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
const GetModal = (req, res) => {
	pool.query("SELECT  ma_model.Model  FROM   ma_model", (err, rows) => {
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
	pool.query("DELETE FROM ma_model WHERE Model_ID = ?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
};

exports.AddModal = AddModal;
exports.DeleteById = DeleteById;
exports.GetModal = GetModal;
