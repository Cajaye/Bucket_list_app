const ErrorHandlerMiddleware = (err, req, res, next) => {
    const customErrObj = {
        errMessage: err.message || "Internal server error, try again later",
        errStatusCode: err.statusCode || 500
    }

    if (err.code && err.code == 11000) {
        const keys = Object.keys(err.keyValue) //array of obj keys
        customErrObj.errMessage = `${keys} already exists please use another name`
        customErrObj.errStatusCode = 400 //badreq
    }

    if (err.name == "ValidationError") {
        //get each message value in the err.errors object
        const requiredValues = Object.values(err.errors).map((v) => v.message).join(", ")

        customErrObj.errMessage = `${requiredValues}`
        customErrObj.errStatusCode = 400 //badreq

    }

    //handle cast error

    res.status(customErrObj.errStatusCode).json({ message: customErrObj.errMessage })
}

module.exports = ErrorHandlerMiddleware