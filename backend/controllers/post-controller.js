const Post = require("../models/post-model");
const Comment = require("../models/comment-model");
const User = require("../models/user-model");

exports.createAPost = async (req, res, next) => {
  const creator = req.userData.userId;
  const creatorName = req.userData.userName;
  const { title, content, imagePath } = req.body;
  const newPost = new Post({
    title,
    content,
    imagePath,
    creator,
    creatorName
  });
  try {
    const user = await User.findById(creator).exec();
    if (!user) {
      return res.status(422).json({ message: "Post creation error" });
    }
    await newPost.save();
    user.posts.push(newPost);
    await user.save();
    return res.status(201).json({ message: "Post created succesfully" });
  } catch (error) {
    return res.status(500).json({message: "New post server error"});
  }
};

// exports.getSinglePost = async (req, res, next) => {
//   try {
//     const foundPost = await Post.findById(req.params.id)
//       .select("-__v -createdAt")
//       .populate({
//         path: "comments",
//         select: "_id content creator",
//         options: { sort: { createdAt: "asc" } }
//       })
//       .populate({ path: "creator", select: " _id userName" })
//       .exec();
//     if (!foundPost) {
//       return res.status(404).json({ message: "Post not found!" });
//     }
//     return res.status(200).json({ post: foundPost });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({message: "Get single server error"});
//   }
// };

exports.getSinglePost = async (req, res, next) => {
  try {
    const foundPost = await Post.findById(req.params.id)
    .select("-_v -updatedAt -comments")
      .exec();
    if (!foundPost) {
      return res.status(404).json({ message: "Post not found!" });
    }
    return res.status(200).json({ post: foundPost });
  } catch (error) {
    return res.status(500).json({message: "Get single server error"});
  }
};

exports.deletePost = async (req, res, next) => {
  const creator = req.userData.userId;
  const postId = req.params.id;
  try {
    const foundPost = await Post.findById(postId).exec();

    if (!foundPost) {
      return res.status(404).json({ message: "No Post found!" });
    }

    if (foundPost.creator.toString() !== creator.toString()) {
      return res.status(403).json({ message: "Not authorized!" });
    }

    const user = await User.findById(creator).exec();
    await user.posts.pull(postId);
    await user.save();

    // if (foundPost.comments && foundPost.comments.length > 0) {
    //   await Comment.remove({ post: postId });
    //   const foundComments = array.from(foundPost.comments);
    //   foundComments.forEach(comment => {
    //     users.forEach(existUser => {
    //       if (existUser.comments && existUser.comments > 0) {
    //         await existUser.comments.pull({comment: comment});
    //       }
    //     })
    //   });
    // }

    if (foundPost.comments && foundPost.comments.length > 0) {
      await Comment.remove({ post: postId });
      // const foundComments = array.from(foundPost.comments);
      // foundComments.forEach(comment => {
      //   await user.comments.pull(comment);
      // });
    }

    await foundPost.remove();

    return res.status(200).json({ message: "Post deleted! succesfully"});
  } catch (error) {
    return res.status(500).json({message: "Delete post server error"});
  }
};

exports.updatePost = async (req, res, next) => {
  const creator = req.userData.userId;
  const postId = req.params.id;
  const { title, content, imagePath } = req.body;
  try {
    const foundPost = await Post.findById(postId).exec();
    if (!foundPost) {
      return res.status(422).json({
        message: "No post found",
        title: "Post Error!"
      });
    }
    if (foundPost.creator.toString() !== creator.toString()) {
      return res.status(422).json({
        message: "Not Authorized for the specified action",
        title: "Post Error!"
      });
    }
    await foundPost.set(title, content, imagePath);
    await foundPost.save();
    return res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    return res.status(500).json({message: "Update post server error"});
  }
};

exports.getAllPosts = async (req, res, next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = +req.query.currentPage;
  try {
    if (pageSize === undefined || null || currentPage === undefined || null) {
      const posts = await Post.find()
        .sort({ createdAt: -1 })
        .select("-_v -updatedAt -comments")
        .exec();
      return res.status(200).json({
        posts: posts
      });
    } else {
      const totalPages = await Post.estimatedDocumentCount();
      const posts = await Post.find()
        .sort({ createdAt: -1 })
        .select("-_v -updatedAt -comments")
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize)
        .exec();

      return res.status(200).json({
        message: "Posts fetched successfully!",
        posts: posts,
        maxPosts: totalPages
      });
    }
  } catch (error) {
    return res.status(500).json({message: "Get all posts server error"});
  }
};

exports.managePosts = async (req, res, next) => {
  const creator = req.userData.userId;
  try {
    const foundPosts = await Post.find({ creator: creator })
      .sort({ createdAt: -1 })
      .select("-_v -updatedAt -comments")
      .exec();
    if (foundPosts && foundPosts.length === 0) {
      return res.status(404).json({ message: "You have no available posts" });
    }
    return res.status(200).json({ posts: foundPosts });
  } catch (error) {
    return res.status(500).json({message: "Manage posts server error"});
  }
};


exports.veryForEdit = async (req, res, next) => {
  const creator = req.userData.userId;
  const postId = req.params.id;
  try {
    const foundPost = await Post.findById(postId).exec();
    if (!foundPost) {
      return res.status(422).json({
        message: "No post found",
        title: "Post  Error!"
      });
    }
    if (foundPost.creator.toString() !== creator.toString()) {
      return res.status(403).json({
        message: "You are not authorized for the specified operation",
        title: "Post Error!"
      });
    }
    return res.status(200).json({ status: "verified" });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error...",
      title: "Post Error!"
    });
  }
};
