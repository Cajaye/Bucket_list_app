const { BadRequestError, NotFoundError } = require("../errors/index")
const Bucket = require("../models/bucket")

const addBucket = async (req, res) => {
    const { title } = req.body
    const bucket = await Bucket.create({
        title: title,
        user: req.user._id
    })

    res.status(200).json({ ...bucket._doc })
}

const getUserBuckets = async (req, res) => {
    const bucket = await Bucket.find({ user: req.user._id })
    res.status(200).json({ ...bucket })
}

module.exports = { addBucket, getUserBuckets }