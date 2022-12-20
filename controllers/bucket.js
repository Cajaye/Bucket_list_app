const { NotFoundError } = require("../errors/index")
const Bucket = require("../models/bucket")
const ListItem = require("../models/list")

const addBucket = async (req, res) => {
    await Bucket.create({
        title: req.body.title,
        user: req.user._id
    })

    res.status(201).json({ message: "Bucked successfully created" })
}

const getOneBucket = async (req, res) => {
    const { bucketID } = req.params
    const bucket = await Bucket.findOne({ user: req.user._id, _id: bucketID })

    if (!bucket) {
        throw new NotFoundError("No buckets")
    }

    res.status(200).json(bucket)

}

const getUserBuckets = async (req, res) => {
    const { title, sort, fields } = req.query

    let queryObject = { user: req.user._id }

    if (title) {
        queryObject.title = { $regex: title, $options: 'i' }
    }

    let result = Bucket.find(queryObject)

    if (sort) {
        const sortList = sort.split(",").join(" ")
        result = result.sort(sortList)
    }

    if (fields) {
        const fieldList = fields.split(",").join(" ")
        result = result.select(fieldList)
    }

    const bucket = await result

    if (bucket.length === 0) {
        res.status(200).json({ message: "No buckets found" })
        return
    }

    res.status(200).json(bucket)
}

const deleteBucket = async (req, res) => {
    const bucket = await Bucket.findOneAndDelete({ user: req.user._id, _id: req.params.id })

    if (!bucket) {
        throw new NotFoundError("Cannot find bucket")
    }

    const listItems = await ListItem.deleteMany({ bucket: req.params.id })

    res.status(200).json({ message: `Bucket deleted and its ${listItems.deletedCount} items` })
}

const editBucket = async (req, res) => {
    const bucket = await Bucket.findOneAndUpdate({ user: req.user._id, _id: req.params.id }, req.body, { new: true })

    if (!bucket) {
        throw new NotFoundError("Cannot find bucket")
    }

    res.status(200).json({ message: "Bucket edited" })
}

module.exports = { addBucket, getUserBuckets, deleteBucket, editBucket, getOneBucket }