const express = require("express");
const bodyParser = require("body-parser");
const Connection = require("mysql/lib/Connection");
const cors = require("cors");
const res = require('express/lib/response');
const { DEC8_BIN } = require('mysql/lib/protocol/constants/charsets');
const routes = require("./routes/Driver")
const routesMaintanance =require("./routes/Maintanace")
const routesRegisted = require('./routes/Registory')
const Location = require('./routes/Add_Driver_Form')
const routesManageRole = require("./routes/ManageRoles");
const routesOdometer = require("./routes/Odometer");
const routesManageUser = require("./routes/ManageUser");
const routesDashboardPermission = require("./routes/DashboardPermission");
const routesAccessPermission = require("./routes/AccessPermission");
const routesRepair = require("./routes/Repair");
const routesMaintainanceCost = require("./routes/MaintainanceCost");
const routesFuelConsumption = require("./routes/FuelConsumption");
const routesPerformanceDriver = require("./routes/PerformanceDriver");
const routesVehicleDetail = require("./routes/VehicleDetail");
const routesBranch = require("./routes/Branch");
const routesRequierFuel = require("./routes/RequierFuel");
const routesAccident = require("./routes/Accident");
const routesLogin = require("./routes/Login");
const routesProject = require("./routes/Project");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

app.use("/api", routes);
app.use("/api", routesMaintanance);
app.use("/api", routesRegisted);
app.use("/api", routesManageRole);
app.use("/api", routesOdometer);
app.use("/api", routesManageUser);
app.use("/api", routesDashboardPermission);
app.use("/api", routesAccessPermission);
app.use("/uploads", express.static("uploads"));
app.use("/api", routesRepair);
app.use("/api", routesMaintainanceCost);
app.use("/api", routesFuelConsumption);
app.use("/api", routesPerformanceDriver);
app.use("/api", routesVehicleDetail);
app.use("/api", routesBranch);
app.use("/api", routesRequierFuel);
app.use("/api", routesAccident);
app.use("/api", routesLogin);
app.use("/api", routesProject);
app.use('/api', routesRegisted)
app.use('/api', Location)

//Listern on enviroment port or 5000
app.listen(port, () => console.log(`Listern on port ${port}`));
