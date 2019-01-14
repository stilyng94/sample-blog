const express = require("express");
const router = express.Router();
const checkAuth = require("../middlerware/auth-ware");
const commentController = require("../controllers/comment-controller");

router.post("/",checkAuth, commentController.createAComment);
router.get("/:id", commentController.getCommentsOfPost);
router.delete("/:id",checkAuth, commentController.deleteComment);

module.exports = router;
