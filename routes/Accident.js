const express = require("express"),
  router = express.Router();
const GetAccident = require("../controllers/Accident_controller");
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

router.get("/accident", GetAccident.GetAccidentDetails);
router.post("/addaccident", upload.single("photo"), GetAccident.AddAccident);
router.post("/uploadAccident", upload.single("image"), GetAccident.UploadImage);
module.exports = router;
