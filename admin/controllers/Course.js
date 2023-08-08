const Course = require("../models/Course");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//add course
const addCourse = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("You must login first!");

  jwt.verify(token, process.env.JWT_SECRETE_KEY, async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const currentUser = await Admin.findById(userInfo.id);
    if (!currentUser) return res.status(403).json("only admin can add courses")
    const values = req.body;
    const newCourse = new Course(values);
    try {
      const savedCourse = await newCourse.save();
      res.status(200).json(savedCourse);
    } catch (err) {
      res.status(500).json("somthing went wrong!");
    }
  })
}


//updat course
const updateCurse = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("You must login first!");

  jwt.verify(token, process.env.JWT_SECRETE_KEY, async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const currentUser = await Admin.findById(userInfo.id);
    if (!currentUser) return res.status(403).json("only admin can update courses")
    const tobeUpdated = req.body._id;
    try {
      const course = await Course.findByIdAndUpdate(tobeUpdated, {
        $set: req.body,
      })
      res.status(200).json("updated");
    } catch (err) {
      return res.status(500).json("somthing went wrong!")
    }
  })
}


//delete course
const deleteCourse = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("You must login first!");

  jwt.verify(token, process.env.JWT_SECRETE_KEY, async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const currentUser = await Admin.findById(userInfo.id);
    if (!currentUser) return res.status(403).json("only admin can delete courses")
    try {
      await Course.findByIdAndDelete(req.params.id);
      res.status(200).json("course has been deleted");
    } catch (err) {
      return res.status(500).json("somthing went wrong!");
    }
  });
}



//add chapter
const addChapter = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("You must login first!");

  jwt.verify(token, process.env.JWT_SECRETE_KEY, async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const currentUser = await Admin.findById(userInfo.id);
    if (!currentUser) return res.status(403).json("only admin can update courses")
    try {
      const course = await Course.findById(req.params.id);
      await course.updateOne({ $push: { section: req.body } });
      res.status(200).json("The chapter has been add");
    } catch (err) {
      res.status(500).json("Something went wrong");
    }
  })
}


//updat chapter
const updateChapter = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("You must login first!");

  jwt.verify(token, process.env.JWT_SECRETE_KEY, async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const currentUser = await Admin.findById(userInfo.id);
    if (!currentUser) return res.status(403).json("only admin can update courses")

    const courseId = req.params.id;
    const chapterId = req.body._id;

    try {
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }

      var chapter = course.section.find(section => section._id.toString() === chapterId);
      if (!chapter) {
        return res.status(404).json({ message: 'Chapter not found' });
      }

      chapter.type = req.body.type;
      chapter.title = req.body.title;
      chapter.descreption = req.body.descreption;
      chapter.youtubeLink = req.body.youtubeLink;

      await course.save();
      res.json("updated"); // return the updated chapter
    } catch (error) {
      res.status(500).json("somthing went wrong");
    }
  })
}

//delete chapter
const deleteChapter = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("You must login first!");

  jwt.verify(token, process.env.JWT_SECRETE_KEY, async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const currentUser = await Admin.findById(userInfo.id);
    if (!currentUser) return res.status(403).json("only admin can update courses")

    const courseId = req.params.courseid;
    const chapterId = req.params.chapterid;

    try {

      const course = await Course.findByIdAndUpdate(
        courseId,
        { $pull: { section: { _id: chapterId } } },
        { new: true }
      );

      res.status(200).json("deleted"); // return the updated chapter
    } catch (error) {
      console.log(error)
      res.status(500).json("somthing went wrong");
    }
  })
}


//get all course
const getAll = async (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("You must login first!");

  jwt.verify(token, process.env.JWT_SECRETE_KEY, async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const currentUser = await Admin.findById(userInfo.id);
    if (!currentUser) return res.status(403).json("only admin can update courses")
    try {
      const course = await Course.find();
      res.status(200).json(course);
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
      const course = await Course.findById(req.params.id);
      res.status(200).json(course);
    } catch (err) {
      res.status(500).json("somthing went wrong!");
    }
  })
}


module.exports = { addCourse, updateCurse, updateChapter, deleteCourse, addChapter, deleteChapter, getAll, getById };