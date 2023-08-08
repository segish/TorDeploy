const User = require("../models/User");
const Course = require("../models/Course");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
dotenv.config();
//get all course
const GetAll = async (req, res) => {
    try {
        const course = await Course.find();
        const { section, updatedAt, ...others } = course._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json("somthing went wrong!");
    }
}

//get all catagory
const GetCategory = async (req, res) => {
    try {
        const categories = await Course.distinct('category');
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json("something went wrong");
    }
}

//get all course by category
const GetByCatgory = async (req, res) => {
    try {
        const course = await Course.find({ category: req.params.category });

        const filteredCourse = course.map(obj => {
            const { section, updatedAt, ...rest } = obj._doc; 
            return rest;
          });
          
        res.status(200).json(filteredCourse);
    } catch (err) {
        res.status(500).json("something went wrong");
    }
}

//get one course
const GetById = async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You must login first!");

    jwt.verify(token, process.env.JWT_SECRETE_KEY, async (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        try {
            const currentUser = await User.findById(userInfo.id);
            if (!currentUser) return res.status(403).json("You must login first")
            const course = await Course.findById(req.params.id);
            if (currentUser.userType === "gust" && course.type !== "free") return res.status(403).json("You are not allowed for this course");
            res.status(200).json(course);
        } catch (err) {
            res.status(500).json("something went wrong");
        }
    })
}

module.exports = { GetAll, GetCategory, GetByCatgory, GetById };