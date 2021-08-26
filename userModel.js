const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{type: String},
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        unique: true
    },
    userType: {
        type: String,
        enum:["USER", "AUTHER"],
        default: "USER"
    }
}, { timestamps: true });

module.exports = mongoose.model("users", userSchema, "users");