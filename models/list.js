const { model, Schema } = require("mongoose")

const ListItem = new Schema({
    name: { type: String, required: true },
    status: { type: Boolean, required: true, default: false },
    bucket: { type: Schema.Types.ObjectId, ref: "Bucket" }
})

module.exports = model("ListItem", ListItem)