const express = require("express");
const bodyParser = require("body-parser");
const Connection = require("mysql/lib/Connection");
const cors = require("cors");
const res = require("express/lib/response");
const { DEC8_BIN } = require("mysql/lib/protocol/constants/charsets");
const routes = require("./routes/Driver");
const routesMaintanance = require("./routes/Maintanace");
const routesRegisted = require("./routes/Registory");
const routesManageRole = require("./routes/ManageRoles");
const routesOdometer = require("./routes/Odometer");
const routesManageUser = require("./routes/ManageUser");
const routesDashboardPermission = require("./routes/DashboardPermission");
const routesAccessPermission = require("./routes/AccessPermission");

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use("/api", routes);
app.use("/api", routesMaintanance);
app.use("/api", routesRegisted);
app.use("/api", routesManageRole);
app.use("/api", routesOdometer);
app.use("/api", routesManageUser);
app.use("/api", routesDashboardPermission);
app.use("/api", routesAccessPermission);
//Listern on enviroment port or 5000
app.listen(port, () => console.log(`Listern on port ${port}`));
