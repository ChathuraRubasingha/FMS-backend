const express = require('express')
const bodyParser = require('body-parser')
const Connection = require('mysql/lib/Connection')
const cors = require("cors");
const res = require('express/lib/response');
const { DEC8_BIN } = require('mysql/lib/protocol/constants/charsets');
const routes = require("./routes/Driver")
const routesMaintanance =require("./routes/Maintanace")
const routesRegisted = require('./routes/Registory')
const userLogin = require('./routes/Userlogin')

const app = express()
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false}))

app.use(bodyParser.json())
app.use("/api",routes)
app.use("/api",routesMaintanance)
app.use('/api',routesRegisted)
app.use('/api',userLogin)
//Listern on enviroment port or 5000
app.listen(port, () => console.log(`Listern on port ${port}`))