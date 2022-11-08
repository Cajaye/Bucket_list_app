const { model, Schema } = require("mongoose")

const ListItem = new Schema({
    name: { type: String, required: true },
    status: { type: Boolean, default: false },
    bucket: { type: Schema.Types.ObjectId, ref: "Bucket", required: true }
}, { timestamps: true })

module.exports = model("ListItem", ListItem)