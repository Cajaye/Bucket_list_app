const CustomApiError = require("./CustomError")

class BadRequestError extends CustomApiError {
    constructor(message) {
        super(message)
        this.statusCode = 400
    }
}

module.exports = BadRequestError