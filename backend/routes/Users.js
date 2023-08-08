const router = require("express").Router();
const {DeleteAccount, getUser} = require("../controllers/User.js")

router.delete("/delete/:id", DeleteAccount)
router.get("/get", getUser)

module.exports = router;
