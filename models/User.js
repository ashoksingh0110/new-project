const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "User Name is Required"]
    },
    username: {
        type: String,
        unique:true,
        required: [true, "userame is Required"]
    },
    email: {
        type: String,
        required: [true, "User Email Address is Required"]
    },
    phone: {
        type: String,
        required: [true, "User Phone Number is Required"]
    },
    password: {
        type: String,
        required: [true, "User Password is Required"]
    },
    address: {
        type: String,
        default:""
    },
    pin: {
        type: String,
        default:""
    },
    city: {
        type: String,
        default:""
    },
    state: {
        type: String,
        default:""
    }
})
const User = new mongoose.model("User", UserSchema)
module.exports = User
