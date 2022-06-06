const express = require('express'),
router = express.Router()
const Maintanace = require("../controllers/Maintanace_controller")


router.get('/maintanance', Maintanace.GetVehicles)

module.exports = router 