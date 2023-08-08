const router = require("express").Router();
const {addUser, updateUser, deleteUser, getAll, getById, getAllbyDate} = require("../controllers/User.js");

router.post("/add",addUser);
router.post("/update/:id",updateUser);
router.delete("/delete/:id",deleteUser);
router.get("/getall",getAll);
router.get("/chart",getAllbyDate);
router.get("/:id",getById);

module.exports = router;