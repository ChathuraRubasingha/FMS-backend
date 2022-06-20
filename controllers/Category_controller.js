const pool = require("../db");
const express = require("express"),
	router = express.Router();

const AddCategory = (req, res) => {
	console.log(req.body);
	const CategoryName = req.body.CategoryName;

	pool.query(
		"INSERT INTO ma_vehicle_category  (Category_Name) VALUES(?)",
		[CategoryName],
		(err, result) => {
			if (err) {
				console.log(err);
			} else {
				res.send("Success");
			}
		}
	);
};
//Update Category Name
const UpdateCategory = (req, res) => {
	const id = req.params.id;
	const { CategoryName } = req.body;
	console.log(CategoryName);

	pool.query(
		"UPDATE ma_vehicle_category SET Category_Name  = ? WHERE Vehicle_Category_ID = ?",
		[CategoryName, id],
		(err, result) => {
			if (err) {
				res.status(400).send(err);
			} else {
				res.send({
					msg: "Vehicle Category updated successfully"
				});
			}
		}
	);
};

// get data from database
const GetCategory = (req, res) => {
	pool.query(
		"SELECT ma_vehicle_category.Category_Name, Vehicle_Category_ID FROM ma_vehicle_category",
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
	pool.query(
		"DELETE FROM ma_vehicle_category WHERE Vehicle_Category_ID = ?",
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

exports.AddCategory = AddCategory;
exports.DeleteById = DeleteById;
exports.GetCategory = GetCategory;
exports.UpdateCategory = UpdateCategory;
