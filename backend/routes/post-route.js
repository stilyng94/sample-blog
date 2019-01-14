const express = require("express");
const checkAuth = require("../middlerware/auth-ware");
const router = express.Router();
const postController = require("../controllers/post-controller");

router.post("/", checkAuth, postController.createAPost);

router.patch("/:id", checkAuth, postController.updatePost);

router.get("/", postController.getAllPosts);

router.get("/managePosts", checkAuth, postController.managePosts);

router.get("/:id", postController.getSinglePost);

router.get("/:id/verifyEdit", checkAuth, postController.veryForEdit);

router.delete("/:id", checkAuth, postController.deletePost);

module.exports = router;
