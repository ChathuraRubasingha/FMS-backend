const pool = require("../db");
const express = require("express"),
  router = express.Router();

const AddDashboardPermission = (req, res) => {
  console.log(req.body);
  const roleId = req.body.roleId;
  const dashboardItemId = req.body.dashboardItemId;

  pool.query(
    "INSERT INTO dashboard_permission (Role_ID,Dashboard_Item_ID) VALUES(?,?)",
    [roleId, dashboardItemId],
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
const GetDashboardPermission = (req, res) => {
  pool.query(
    "SELECT dashboard_permission.Role_ID, ma_role.Role, dashboard_items.Dashboard_Item_ID, dashboard_items.Display_Name FROM dashboard_items INNER JOIN dashboard_permission ON dashboard_items.Dashboard_Item_ID = dashboard_permission.Dashboard_Item_ID INNER JOIN ma_role ON dashboard_permission.Role_ID = ma_role.Role_ID",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
};

const DeleteById = (req, res) => {
  const roleId = req.params.roleId;
  const dashboardId = req.params.dashboardId;
  console.log(roleId, dashboardId);
  pool.query(
    "DELETE FROM dashboard_permission WHERE Role_ID = ? AND Dashboard_Item_ID=?",
    roleId,
    dashboardId,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

exports.AddDashboardPermission = AddDashboardPermission;
exports.DeleteById = DeleteById;
exports.GetDashboardPermission = GetDashboardPermission;
