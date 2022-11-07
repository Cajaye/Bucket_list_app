const { BadRequestError } = require("../errors/index")
const User = require("../models/auth")

const register = async (req, res, next) => {
    const { username, password } = req.body

    if (!username | !password) throw new BadRequestError("Please include both a username and a password")

    const user = await User.create({ ...req.body })

    const sessionUser = {
        username: user.username,
        password: user.password
    }

    req.login(sessionUser, (err) => {
        if (err) {
            return next(err)
        }

        res.status(200).json({ username: req.user.username })
    })
}

const login = async (req, res) => {
    res.status(200).json({ username: req.user.username }) //if you only send res.status the process doesn't end
}

module.exports = { register, login }