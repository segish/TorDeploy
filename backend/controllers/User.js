const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//delete user
const DeleteAccount = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("You must login first!");

  jwt.verify(token, process.env.JWT_SECRETE_KEY, async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    if (req.params.id !== userInfo.id) return res.status(403).json("You can delete only your account!");

    try {
      const tobeDelete = await User.findById(req.params.id);
      if (!tobeDelete) return res.status(403).json("No account found!");
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json("somthing went wrong!");
    }
  });
}


const getUser = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("You must login first!");

  jwt.verify(token, process.env.JWT_SECRETE_KEY, async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    try {
      const user = await User.findById(userInfo.id);
      if (!user) return res.status(403).json("No account found!");
      const { password, updatedAt, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      return res.status(500).json("somthing went wrong!");
    }
  });
}
module.exports = { DeleteAccount, getUser };