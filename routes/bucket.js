const router = require("express").Router()

const { addBucket, getUserBuckets } = require("../controllers/bucket")
const isUserAuthenticated = require("../middlewares/isAuthenticated")

router.route("/user/bucket", isUserAuthenticated)
    .post(addBucket)
    .get(getUserBuckets)

module.exports = router