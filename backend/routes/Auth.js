const router = require("express").Router();
const {Register, Otp, Login, Logout, Forgot, ResetPassword} = require("../controllers/Auth")

router.post("/register", Register)
router.post("/otp", Otp)
router.post("/login", Login)
router.post("/logout", Logout)
router.post("/forgot", Forgot)
router.post("/reset-password", ResetPassword)

module.exports = router;