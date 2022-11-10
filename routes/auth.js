const router = require("express").Router()
const passport = require("passport")
const { register, login } = require("../controllers/auth")

router.route("/auth/register").post(register)
router.route("/auth/login").post(passport.authenticate('local'), login)

// logout


module.exports = router