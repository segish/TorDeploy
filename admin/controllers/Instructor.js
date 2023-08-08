const Instructor = require("../models/Instructor");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//add instruct
const addInstructor = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("You must login first!");

  jwt.verify(token, process.env.JWT_SECRETE_KEY, async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const currentUser = await Admin.findById(userInfo.id);
    if (!currentUser) return res.status(403).json("only admin can add Instructors")
    const values = req.body;
    const newInstructor = new Instructor(values);
    try {
      const savedInstructor = await newInstructor.save();
      res.status(200).json(savedInstructor);
    } catch (err) {
      res.status(500).json("somthing went wrong!");
    }
  })
}

//updat Instructor
const updateInstructor = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("You must login first!");

  jwt.verify(token, process.env.JWT_SECRETE_KEY, async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const currentUser = await Admin.findById(userInfo.id);
    if (!currentUser) return res.status(403).json("only admin can update Instructors")
    const tobeUpdated = req.params.id;
    try {
      const updated = await Instructor.findByIdAndUpdate(tobeUpdated, {
        $set: req.body,
      })
      res.status(200).json("updated");
    } catch (err) {
      return res.status(500).json("somthing went wrong!")
    }
  })
}

//delete Instructor
const deleteInstructor = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("You must login first!");

  jwt.verify(token, process.env.JWT_SECRETE_KEY, async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const currentUser = await Admin.findById(userInfo.id);
    if (!currentUser) return res.status(403).json("only admin can delete courses")
    try {
      await Instructor.findByIdAndDelete(req.params.id);
      res.status(200).json("Instructor has been deleted");
    } catch (err) {
      return res.status(500).json("somthing went wrong!");
    }
  });
}

//get all Instructor
const getAll = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("You must login first!");

  jwt.verify(token, process.env.JWT_SECRETE_KEY, async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const currentUser = await Admin.findById(userInfo.id);
    if (!currentUser) return res.status(403).json("only admin can update courses")
    try {
      const instructs = await Instructor.find();
      res.status(200).json(instructs);
    } catch (err) {
      res.status(500).json("somthing went wrong!");
    }
  })
}

//get one course
const getById = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("You must login first!");

  jwt.verify(token, process.env.JWT_SECRETE_KEY, async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const currentUser = await Admin.findById(userInfo.id);
    if (!currentUser) return res.status(403).json("only admin can update courses")
    try {
      const instructs = await Instructor.findById(req.params.id);
      res.status(200).json(instructs);
    } catch (err) {
      res.status(500).json("somthing went wrong!");
    }
  })
}

module.exports = { addInstructor, updateInstructor, deleteInstructor, getAll, getById };