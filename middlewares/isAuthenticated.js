const { NotAuthenticatedError } = require("../errors/index")

const isUserAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        throw new NotAuthenticatedError("You don't have access to this route")
    }

    next()
}

module.exports = isUserAuthenticated