const express = require('express'),
router = express.Router()
const Location = require("../controllers/Add_Driver_Form_Controller")

router.get('/getLocation', Location.GetLocation)

module.exports = router