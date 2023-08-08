const User = require("../models/User");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")
const dotenv = require("dotenv");
dotenv.config();

//add user
const addUser = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("You must login first!");

  jwt.verify(token, process.env.JWT_SECRETE_KEY, async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const currentUser = await Admin.findById(userInfo.id);
    if (!currentUser) return res.status(403).json("only admin can add users")

    const salt = await bcrypt.genSalt(10);
    const hashedPssword = await bcrypt.hash(req.body.password, salt);
    //create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPssword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      paymentStatus: req.body.paymentStatus,
      phone: req.body.phone,
    });

    try {
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (err) {
      res.status(500).json("somthing went wrong!");
    }
  })
}

//updat User
const updateUser = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("You must login first!");

  jwt.verify(token, process.env.JWT_SECRETE_KEY, async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const currentUser = await Admin.findById(userInfo.id);
    if (!currentUser) return res.status(403).json("only admin can update Users")
    const tobeUpdated = req.params.id;
    try {
      const updated = await User.findByIdAndUpdate(tobeUpdated, {
        $set: req.body,
      })
      res.status(200).json("updated");
    } catch (err) {
      return res.status(500).json("somthing went wrong!")
    }
  })
}

//delete User
const deleteUser = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("You must login first!");

  jwt.verify(token, process.env.JWT_SECRETE_KEY, async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const currentUser = await Admin.findById(userInfo.id);
    if (!currentUser) return res.status(403).json("only admin can delete courses!")
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (err) {
      return res.status(500).json("somthing went wrong!");
    }
  });
}

//get all User
const getAll = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("You must login first!");

  jwt.verify(token, process.env.JWT_SECRETE_KEY, async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const currentUser = await Admin.findById(userInfo.id);
    if (!currentUser) return res.status(403).json("only admin can delete courses!")
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json("somthing went wrong!");
    }
  })
}

//get one user
const getById = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("You must login first!");

  jwt.verify(token, process.env.JWT_SECRETE_KEY, async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const currentUser = await Admin.findById(userInfo.id);
    if (!currentUser) return res.status(403).json("only admin can delete courses!")
    try {
      const users = await User.findById(req.params.id);
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json("somthing went wrong!");
    }
  })
}

//get all User for chart
const getAllbyDate = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("You must login first!");

  jwt.verify(token, process.env.JWT_SECRETE_KEY, async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const currentUser = await Admin.findById(userInfo.id);
    if (!currentUser) return res.status(403).json("only admin can delete courses!")
    try {
      const { year, month } = req.query;
      const createdAt = new Date(`${year}-${month}`);
      const startMonthDate = new Date(createdAt.getFullYear(), createdAt.getMonth(), 1);
      const endMonthDate = new Date(createdAt.getFullYear(), createdAt.getMonth() + 1, 1);
      const data = await User.find({ createdAt: { $gte: startMonthDate, $lt: endMonthDate } });
      res.json(data.length);
    } catch (err) {
      res.status(500).json("somthing went wrong!" + err);
    }
  })
}

module.exports = { addUser, updateUser, deleteUser, getAll, getById, getAllbyDate };