const router = require("express").Router()

const { addBucket, getUserBuckets, deleteBucket, editBucket } = require("../controllers/bucket")
const { addListItem, getListItems, editListItem, deleteListItem } = require("../controllers/list")

router.route("/user/bucket")
    .post(addBucket)
    .get(getUserBuckets)

router.route("/user/bucket/:id").delete(deleteBucket).patch(editBucket)

router.route("/user/list").post(addListItem).get(getListItems)
router.route("/user/list/:id").delete(deleteListItem).patch(editListItem)

module.exports = router