const { model, Schema } = require("mongoose")

const Bucket = new Schema({
    title: String,
    list: [{ type: Schema.Types.ObjectId, ref: "ListItem" }], //when you create a list item add the bucket id to it
    user: { type: Schema.Types.ObjectId, ref: "User" }
})

module.exports = model("Bucket", Bucket)