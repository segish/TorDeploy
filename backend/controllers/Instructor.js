const Instructor = require("../models/Instructor");

//get all Instructor
const getAll = async (req, res) => {
    try {
      const instructs = await Instructor.find();
      res.status(200).json(instructs);
    } catch (err) {
      res.status(500).json("somthing went wrong!");
    }
  }

//get one instructor
const getById = async (req, res) => {
  try {
    const instructs = await Instructor.findById(req.params.id);
    res.status(200).json(instructs);
  } catch (err) {
    res.status(500).json("somthing went wrong!");
  }
}

module.exports = {getAll, getById};