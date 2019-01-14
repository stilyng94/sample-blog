const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user-model");

exports.register = async (req, res, next) => {
  const { email, password, userName } = req.body;

  try {
    const existedEmail = await User.findOne({ email: email }).exec();
    if (existedEmail) {
      return res.status(422).json({
        message: "email already taken"
      });
    }
    if (password.length < 8) {
      return res.status(422).json({
        message: "password should be 8 or more characters long"
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      password: hashedPassword,
      userName: userName
    });
    await user.save();
    return res.status(201).json({ message: "User created" });
  } catch (error) {
    return res.status(500).json({message: "Register server error"});
  }
};


exports.logInUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existedUser = await User.findOne({ email: email }).exec();
    if (!existedUser) {
      return res.status(401).json({
        message: "Authentication failed"
      });
    }
    const samePassword = await bcrypt.compare(password, existedUser.password);
    if (!samePassword) {
      return res.status(401).json({
        message: "Authentication failed"
      });
    }
    const token = jwt.sign(
      {
        userId: existedUser._id,
        userName: existedUser.userName,
        userEmail: existedUser.email,

      },
      process.env.JWT_KEY,
      {
        expiresIn: 3600
      }
    );
    return res.status(200).json({
      message: "Auth succesful",
      token: token,
      userId: existedUser._id,
      userName: existedUser.userName,
      expiresIn: 3600
    });
  } catch (error) {
    return res.status(500).json({message: "login server error"});
  }
};
