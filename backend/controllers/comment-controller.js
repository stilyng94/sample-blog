const Comment = require("../models/comment-model");
const Post = require("../models/post-model");

exports.createAComment = async (req, res, next) => {
  const postId = req.body.postId;
  try {
    const existedPost = await Post.findById(postId);
    if (!existedPost) {
      return res.status(500).json({ message: "Post doesnt exist so cant create comment" });
    }
    const newComment = new Comment({
      content: req.body.content,
      creator: req.userData.userId,
      post: postId,
      creatorName: req.userData.userName
    });
    await newComment.save();
    existedPost.comments.push(newComment);
    await existedPost.save();
    return res.status(201).json({
      message: "Comment added successfully",
      comment: newComment
    });
  } catch (error) {
    return res.status(500).json({ message: "New Comment server error" });
  }
};

exports.getCommentsOfPost = async (req, res, next) => {
  const postId = req.params.id;
  try {
    const foundComments = await Comment.find({ post: postId }).sort({createdAt: -1})
      .select("_id content creator creatorName createdAt")
      .exec();
    if (!foundComments) {
      return res.status(404).json({
        message: "Comment Not Found"
      });
    }
    return res.status(200).json({ comments: foundComments });
  } catch (error) {
    return res.status(500).json({ message: "Get comment server error" });
  }
};

exports.deleteComment = async (req, res, next) => {
  const commentId = req.params.id;
  const userId = req.userData.userId;

  try {
    const foundComment = await Comment.findById(commentId)
      .select("creator post")
      .exec();
    if (!foundComment) {
      return res.status(404).json({
        message: "Comment Not Found"
      });
    }
    if (foundComment.creator.toString() !== userId.toString()) {
      return res.status(401).json({
        message: "Not Authorized"
      });
    }

    const foundPost = await Post.findById(foundComment.post).exec();
    if (!foundPost) {
      await foundComment.remove();
    } else {
      await foundComment.remove();
      await foundPost.comments.pull(commentId);
      await foundPost.save();
    }
    return res.status(200).json({ message: "Deleted"});
  } catch (error) {
    return res.status(500).json({ message: "Delete comment server error" });
  }
};
