const express = require("express");
const router = express.Router();
const imageUpload = require("../middlerware/file-storage");
const imageUploadController = require("../controllers/image-upload-controller");
const authWare = require("../middlerware/auth-ware");

router.post(
  "/",
  authWare,
  imageUpload,
  imageUploadController.uploadImage
);

module.exports = router;
