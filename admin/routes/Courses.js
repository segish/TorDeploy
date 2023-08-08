const router = require("express").Router();
const {addCourse, updateCurse, updateChapter, addChapter, deleteChapter, deleteCourse, getAll, getById} = require("../controllers/Course.js");

router.post("/add",addCourse);
router.post("/update",updateCurse);
router.post("/updatechapter/:id",updateChapter);
router.post("/addchapter/:id",addChapter);
router.delete("/:courseid/deletechapter/:chapterid",deleteChapter);
router.delete("/delete/:id",deleteCourse);
router.get("/getall",getAll);
router.get("/:id",getById);

module.exports = router;