const express = require("express"),
  router = express.Router();
const Driver = require("../controllers/Driver_controller");

router.post('/addriver', Driver.Adddriver)
router.get('/drivers', Driver.GetDrivers)
router.get('/driver/:id', Driver.GetDriver)
router.put('/driver/:id', Driver.UpdateDriver)
router.delete('/deletedriver/:id', Driver.DeleteById)


module.exports = router;
