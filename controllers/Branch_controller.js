const pool = require("../db");
const express = require("express"),
	router = express.Router();

const AddBranch = (req, res) => {
	console.log(req.body);

	const branch = req.body.branch;

	pool.query(
		"INSERT INTO ma_branch (Branch)VALUES(?)",
		[branch],
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
const GetBranch = (req, res) => {
	pool.query(
		"SELECT ma_branch.Branch_Id, ma_branch.Branch FROM  ma_branch",
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
const DeleteById = (req, res) => {
	const id = req.params.id;
	console.log(id);
	pool.query("DELETE FROM ma_branch WHERE Branch_Id = ?", id, (err, result) => {
		if (err) {
			console.log(err);
		} else {
			res.send(result);
		}
	});
};

const ViewBranch = (req, res) => {
	const Branch_Id = req.params.id;

	pool.query(
		"  SELECT ma_branch.Branch_Id, ma_branch.Branch, ma_branch.add_by,	ma_branch.add_date,	ma_branch.edit_by,	ma_branch.edit_date	FROM	ma_branch WHERE ma_branch.Branch_Id = ?",
		Branch_Id,

		(err, result) => {
			if (err) {
				res.status(400).send(err);
			} else {
				res.send(result[0]);
			}
		}
	);
};

exports.ViewBranch = ViewBranch;
exports.DeleteById = DeleteById;
exports.GetBranch = GetBranch;
exports.AddBranch = AddBranch;
