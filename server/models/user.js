import mongoose from "mongoose";

const userSchema = new  mongoose.Schema({
    first_name: {
        type: String,
        require: true
    },
    last_name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    status: {
        type: String,
        default: "active"
    },
}, {timestamps: true})


const User = mongoose.model("userdatas",userSchema)

export default User