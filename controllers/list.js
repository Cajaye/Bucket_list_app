const ListItem = require("../models/list")

const addListItem = async (req, res) => {
    await ListItem.create(req.body)
    res.status(200).json({ message: "Item created successfully" })
}

const getListItems = async (req, res) => {
    const { bucketID, name, status, sort, fields } = req.query

    let queryObject = {}

    if (bucketID) {
        queryObject.bucket = bucketID
    }

    if (name) {
        queryObject.name = name
    }

    if (status) {
        queryObject.status = status.toLowerCase() === "true" ? true : false
    }

    let result = ListItem.find(queryObject)

    if (sort) {
        const sortList = sort.split(",").join(" ")
        result = result.sort(sortList)
    }

    if (fields) {
        const fieldList = fields.split(",").join(" ")
        result = result.select(fieldList)
    }

    const listItems = await result

    if (!listItems) {
        res.json({ message: "You have no items in this bucket" })
    }

    res.status(200).json(listItems)
}

module.exports = { addListItem, getListItems }