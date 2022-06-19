const express = require("express"),
  router = express.Router();
const multer = require("multer");
const GetProjectdetails = require("../controllers/Project_controller");

const storage = multer.diskStorage({
  destination: "./src/images",
  filename: (req, file, cb) => {
    return;
  },
});

router.get("/getproject", GetProjectdetails.GetProjectdetails);

module.exports = router;
