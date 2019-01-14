const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  userName: { type: String, required: true, maxlength: 32 },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 8 },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post"
    }
  ]
}, {timestamps: {}});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
