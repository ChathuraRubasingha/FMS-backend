const express = require('express'),
router = express.Router()
const summary = require("../controllers/summary")

router.post('/addriver',summary.Adddriver)
router.get('/drivers',summary.GetDrivers)
router.delete('/deletedriver/:id',summary.DeleteById)

module.exports = router