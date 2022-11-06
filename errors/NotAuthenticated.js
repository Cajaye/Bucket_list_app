const CustomApiError = require("./CustomError")

class NotAuthenticatedError extends CustomApiError {
    constructor(message) {
        super(message)
        this.statusCode = 401
    }
}

module.exports = NotAuthenticatedError