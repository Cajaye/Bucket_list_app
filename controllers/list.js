const { NotFoundError } = require("../errors")
const ListItem = require("../models/list")

const addListItem = async (req, res) => {
    const listItem = await ListItem.create(req.body)
    res.status(201).json(listItem)
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

    if (listItems.lenght === 0) {
        res.json({ message: "You have 0 items in this bucket" })
    }

    res.status(200).json(listItems)
}

const getOneListItem = async (req, res) => {
    const { listItemID } = req.params
    const listItem = await ListItem.findById(listItemID)

    if (!listItem) {
        throw new NotFoundError("No item found")
    }

    res.status(200).json(listItem)
}

const deleteListItem = async (req, res) => {
    const listItem = await ListItem.findOneAndDelete({ _id: req.params.id })

    if (!listItem) {
        throw new NotFoundError("Cannot find bucket")
    }

    res.status(200).json({ message: "Deleted successfully" })
}

const editListItem = async (req, res) => {
    const listItem = await ListItem.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })

    if (!listItem) {
        throw new NotFoundError("Cannot find item")
    }

    res.status(200).json({ message: "Edited successfully" })
}

module.exports = { addListItem, getListItems, editListItem, deleteListItem, getOneListItem }