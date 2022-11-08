const bcrypt = require("bcryptjs")
const { model, Schema } = require("mongoose")

const User = new Schema({
    username: { type: String, required: [true, "Username is required"], unique: [true, "Username already exists"] },
    password: { type: String, required: [true, "Password is required"] },
}, { timestamps: true })

User.pre('save', async function () {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

module.exports = model("User", User)