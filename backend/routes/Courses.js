const router = require("express").Router();
const { GetAll, GetCategory, GetByCatgory, GetById } = require("../controllers/Course");

router.get("/all", GetAll);
router.get("/categories", GetCategory);
router.get("/all/:category", GetByCatgory);
router.get("/:id", GetById);

module.exports = router;