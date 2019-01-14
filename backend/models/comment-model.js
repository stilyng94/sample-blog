const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  content: { type: String, required: true},
  creatorName: {type: String, required: true},
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  post:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Post',
    required:true
  }
}, { timestamps: {} }
);

module.exports = mongoose.model("Comment", commentSchema);
