const pool = require("../db");
const express = require("express"),
  router = express.Router();

//rishies back end
const GetProjectdetails = (req, res) => {
  pool.query("SELECT * FROM project_details", (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
};

exports.GetProjectdetails = GetProjectdetails;
