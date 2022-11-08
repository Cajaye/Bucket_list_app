const router = require("express").Router()

const { addBucket, getUserBuckets } = require("../controllers/bucket")
const { addListItem, getListItems } = require("../controllers/list")

router.route("/user/bucket")
    .post(addBucket)
    .get(getUserBuckets)

router.route("/user/bucket/list").post(addListItem).get(getListItems)

//routes to edit and delete and getOne bucket or getOne list item

module.exports = router