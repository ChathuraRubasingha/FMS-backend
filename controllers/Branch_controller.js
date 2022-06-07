const pool = require("../db");
const express = require("express"),
	router = express.Router();

const AddBranch = (req, res) => {
	console.log(req.body);
	const location = req.body.location;
	const branch = req.body.branch;

	pool.query(
		"INSERT INTO ma_location (Location_Name)VALUES(?)",
		"INSERT INTO ma_branch (Branch)VALUES(?)",
		[location, branch],
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
		"SELECT    ma_branch.Branch,    ma_location.Location_Name   FROM  ma_location    INNER JOIN ma_branch ON ma_branch.Location_ID = ma_location.Location_ID",
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
// const DeleteById= (req, res) =>{
//     const id = req.params.id
//     console.log(id)
//     pool.query('DELETE FROM ma_driver WHERE Driver_ID = ?', id, (err, result) => {
//         if(err) {
//             console.log(err)
//         }else{
//             res.send(result);
//         }
//     })
// }

exports.AddBranch = AddBranch;
// exports.DeleteById=DeleteById
exports.GetBranch = GetBranch;
