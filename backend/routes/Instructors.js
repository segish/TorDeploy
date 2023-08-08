const router = require("express").Router();
const {getAll, getById} = require("../controllers/Instructor.js");

router.get("/getall",getAll);
router.get("/:id",getById);

module.exports = router;