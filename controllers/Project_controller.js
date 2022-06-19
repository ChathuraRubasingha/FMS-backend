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

const Addproject = (req, res) => {
  console.log(req.body);
  const project_name = req.body.project_name;
  const start_date = req.body.start_date;
  const progress = req.body.progress;

  pool.query(
    "INSERT INTO project_details(project_name, start_date,progress) VALUES(?,?,?)",
    [project_name, start_date, progress],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Success");
      }
    }
  );
};

const DeleteById = (req, res) => {
  const id = req.params.id;
  console.log(id);
  pool.query(
    "DELETE FROM project_details WHERE project_id = ?",
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

exports.GetProjectdetails = GetProjectdetails;
exports.Addproject = Addproject;
exports.DeleteById = DeleteById;
