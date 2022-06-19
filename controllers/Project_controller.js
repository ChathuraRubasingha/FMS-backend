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

const DeleteProject = (req, res) => {
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

const Getproject = (req, res) => {
  const id = req.params.id;
  pool.query(
    "SELECT * FROM project_details WHERE project_id = ?",
    id,
    (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send(result[0]);
      }
    }
  );
};

const UpdateProject = (req, res) => {
  const id = req.params.id;
  const { project_name, start_date, progress } = req.body;
  console.log(project_name, progress);

  pool.query(
    "UPDATE project_details SET project_name = ?, start_date = ?, progress = ? WHERE project_id = ?",
    [project_name, start_date, progress, id],
    (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send({
          msg: "User updated successfully",
        });
      }
    }
  );
};

const UpdateStatus = (req, res) => {
  const id = req.params.id;
  const { Approve_status } = req.body;
  console.log(Approve_status + " " + id);
  pool.query(
    "UPDATE fuel_request_details SET Approve_Status= ? WHERE Fuel_Request_ID = ?",
    [Approve_status, id],
    (err, result) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.send({
          msg: "User updated successfully",
        });
      }
    }
  );
};

exports.GetProjectdetails = GetProjectdetails;
exports.Addproject = Addproject;
exports.DeleteProject = DeleteProject;
exports.UpdateProject = UpdateProject;
exports.Getproject = Getproject;
exports.UpdateStatus = UpdateStatus;
