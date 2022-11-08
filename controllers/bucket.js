const { BadRequestError, NotFoundError } = require("../errors/index")
const Bucket = require("../models/bucket")

const addBucket = async (req, res) => {
    await Bucket.create({
        title: req.body.title,
        user: req.user._id
    })

    res.status(200).json({ message: "Bucked successfully created" })
}

const getUserBuckets = async (req, res) => {
    const { title, sort, fields } = req.query

    let queryObject = { user: req.user._id }

    if (title) {
        queryObject.title = { $regex: title, $options: 'i' }
    }

    let result = Bucket.find(queryObject)
    //sorts and fields

    if (sort) {
        const sortList = sort.split(",").join(" ")
        result = result.sort(sortList)
    }

    //localhost:3000/user/bucket/?sort=-title

    if (fields) {
        const fieldList = fields.split(",").join(" ")
        result = result.select(fieldList)
    }

    const bucket = await result

    if (bucket.length === 0) {
        res.status(200).json({ message: "No buckets found" })
        return
    }

    res.status(200).json({ ...bucket })
}

module.exports = { addBucket, getUserBuckets }