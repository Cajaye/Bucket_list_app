const { BadRequestError } = require("../errors/index")
const User = require("../models/auth")

const register = async (req, res) => {
    const { username, password } = req.body

    if (!username | !password) throw new BadRequestError("Please include both a username and a password")

    const user = await User.create({ ...req.body })
    res.status(200).json(user)
}

const login = async (req, res) => {
    res.status(200).send(`${req.user.username}`) //if you only send res.status the process doesn't end
}

module.exports = { register, login }