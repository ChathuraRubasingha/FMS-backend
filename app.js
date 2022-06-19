const express = require("express");
const bodyParser = require("body-parser");
const Connection = require("mysql/lib/Connection");
const cors = require("cors");
const res = require("express/lib/response");
const { DEC8_BIN } = require("mysql/lib/protocol/constants/charsets");
const routes = require("./routes/Driver");
const routesMaintanance = require("./routes/Maintanace");
const routesRepair = require("./routes/Repair");
const routesMaintainanceCost = require("./routes/MaintainanceCost");
const routesFuelConsumption = require("./routes/FuelConsumption");
const routesPerformanceDriver = require("./routes/PerformanceDriver");
const routesVehicleDetail = require("./routes/VehicleDetail");
const routesBranch = require("./routes/Branch");
const routesRequierFuel = require("./routes/RequierFuel");
const routesAccident = require("./routes/Accident");
const routesLocation = require("./routes/Location");
const routesDesignation = require("./routes/Designation");
const routesMake = require("./routes/Make");
const routesModal = require("./routes/Modal");
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use("/api", routes);
app.use("/api", routesMaintanance);
app.use("/api", routesRepair);
app.use("/api", routesMaintainanceCost);
app.use("/api", routesFuelConsumption);
app.use("/api", routesPerformanceDriver);
app.use("/api", routesVehicleDetail);
app.use("/api", routesBranch);
app.use("/api", routesRequierFuel);
app.use("/api", routesAccident);
app.use("/api", routesLocation);
app.use("/api", routesDesignation);
app.use("/api", routesMake);
app.use("/api", routesModal);

//Listern on enviroment port or 5000
app.listen(port, () => console.log(`Listern on port ${port}`));
