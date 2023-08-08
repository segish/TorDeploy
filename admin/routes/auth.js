const router = require("express").Router();
const { addAdmin, login, logout, getAdmin, changePwd } = require("../controllers/Auth.js")

router.post("/add", addAdmin)
router.post("/login", login)
router.post("/logout", logout)
router.post("/pwdchange", changePwd)
router.post("/refresh", getAdmin)
module.exports = router;