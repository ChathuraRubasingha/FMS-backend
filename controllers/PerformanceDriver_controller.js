const pool = require("../db");
const express = require("express"),
	router = express.Router();

// get data from database
const GetPerformanceDriver = (req, res) => {
	pool.query(
		"SELECT   ma_driver.Full_Name,   ma_location.Location_Name,   ma_driver.NIC,   ma_driver.`Status`,   ma_driver.Mobile    FROM    ma_driver   INNER JOIN ma_location ON ma_driver.Location_ID = ma_location.Location_ID",
		(err, rows) => {
			if (!err) {
				res.send(rows);
			} else {
				console.log(err);
			}
		}
	);
};

exports.GetPerformanceDriver = GetPerformanceDriver;
