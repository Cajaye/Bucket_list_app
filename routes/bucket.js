const router = require("express").Router()

const { addBucket, getUserBuckets } = require("../controllers/bucket")

router.route("/user/bucket")
    .post(addBucket)
    .get(getUserBuckets)

module.exports = router