const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("./middlerware/cors");
const mongoose = require("mongoose");
const postRoutes = require("./routes/post-route");
const authRoutes = require("./routes/auth-route");
const commentRoutes = require("./routes/comment-route");
const imageUploadRoute = require("./routes/image-upload-route");

const dbUrl = "mongodb://@localhost:27017/sampleBlogDb";
mongoose
  .connect(
    dbUrl,
    { useNewUrlParser: true, useCreateIndex: true }
  )
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("not connected");
  });
mongoose.PromiseProvider = global.Promise;

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));
app.use(cors);
app.disable("x-powered-by");


app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/uploadImage", imageUploadRoute);

module.exports = app;
