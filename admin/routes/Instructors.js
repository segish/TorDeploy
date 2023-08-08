const router = require("express").Router();
const {addInstructor, updateInstructor, deleteInstructor, getAll, getById} = require("../controllers/Instructor.js");

router.post("/add",addInstructor);
router.post("/update/:id",updateInstructor);
router.delete("/delete/:id",deleteInstructor);
router.get("/getall",getAll);
router.get("/:id",getById);
module.exports = router;