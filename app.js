const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const Connection = require("mysql/lib/Connection");
const cors = require("cors");
const res = require("express/lib/response");
const { DEC8_BIN } = require("mysql/lib/protocol/constants/charsets");

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

//MySql
const db = mysql.createConnection({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "",
  database: "smsl_fleet_sqm",
});
//add data to database
app.post("/adddriver", (req, res) => {
  console.log(req.body);
  const callingName = req.body.callingName;
  const fullName = req.body.fullName;
  const location = req.body.location;
  const nic = req.body.nic;
  const status = req.body.status;
  const mobile = req.body.mobile;
  const address = req.body.address;
  const image = req.body.image;

  db.query(
    "INSERT INTO ma_driver (Full_Name, Complete_Name, Location_ID, NIC, Status, Mobile, Private_Address, Driver_Image) VALUES(?,?,?,?,?,?,?,?)",
    [callingName, fullName, location, nic, status, mobile, address, image],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Success");
      }
    }
  );
});

//add data to fuel request
app.post("/addfuelrequest", (req, res) => {
  console.log(req.body);
  const driverid = req.body.driverid;
  const vehicleid = req.body.vehicleid;
  const date = req.body.date;
  const odometer = req.body.odometer;
  const Liters = req.body.Liters;

  db.query(
    "INSERT INTO fuel_request_details(Driver_ID, Vehicle_No,Request_Date, Meter_Reading, Required_Fuel_Capacity ) VALUES(?,?,?,?,?)",
    [driverid, vehicleid, date, odometer, Liters],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Success");
      }
    }
  );
});

// get data from database

app.get("/driver", (req, res) => {
  db.query(
    "SELECT Driver_ID, Full_Name, NIC, Mobile FROM ma_driver",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

//rishies back end
app.get("/fuelrequest", (req, res) => {
  db.query(
    "SELECT fuel_request_details.Vehicle_No,ma_driver.Full_Name,fuel_request_details.Driver_ID, fuel_request_details.Request_Date, fuel_request_details.Meter_Reading,fuel_request_details.Fuel_Balance,fuel_request_details.Required_Fuel_Capacity FROM fuel_request_details INNER JOIN ma_driver ON fuel_request_details.Driver_ID = ma_driver.Driver_ID",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

app.get("/accidentdetails", (req, res) => {
  db.query(
    "SELECT accident.Vehicle_No,accident.Driver_ID,accident.Date_and_Time,accident.Accident_Place,accident.Police_Station,accident.Odometer_After_Accident FROM accident",
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

//delete data
app.delete("/deletedriver/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  db.query("DELETE FROM ma_driver WHERE Driver_ID = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//get data by id

app.get("/:Driver_ID", (req, res) => {
  pool.getConnection((err, Connection) => {
    if (err) throw err;
    console.log(`Connected as id ${Connection.threadId}`);
    //query

    Connection.query(
      "select Complete_Name, NIC, Mobile from ma_driver WHERE Driver_ID = ?",
      [req.params.Driver_ID],
      (err, rows) => {
        Connection.release();

        if (!err) {
          res.send(rows);
        } else {
          console.log(err);
        }
      }
    );
  });
});

//Rihies Backend

//Listern on enviroment port or 5000
app.listen(port, () => console.log(`Listern on port ${port}`));
