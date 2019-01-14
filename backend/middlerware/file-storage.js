const multer = require("multer");

const mimeFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`);
  }
});

module.exports = multer({ storage: storage, fileFilter: mimeFilter, limits: { fileSize: 1024 * 1024 * 5 } }).single(
  "image"
);
