const { model, Schema } = require("mongoose")

const Bucket = new Schema({
    title: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true })

module.exports = model("Bucket", Bucket)