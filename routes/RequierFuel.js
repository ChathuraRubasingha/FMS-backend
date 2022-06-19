const express = require("express"),
  router = express.Router();
const GetFuel = require("../controllers/Fuel_controller");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Image unacceptable!"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.post("/addfuel", GetFuel.Addfuel);
router.post("/addfuelconfirm", upload.single("photo"), GetFuel.Addfuelconfirm);
router.get("/fuelrequest", GetFuel.GetFuelrequest);
router.get("/fueldetails", GetFuel.GetFueldetails);
router.post("/uploadImage", upload.single("image"), GetFuel.UploadBillImage);

module.exports = router;
