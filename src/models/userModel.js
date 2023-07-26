import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    first_name: {
        type: String,
        // require: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide a email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        dafault: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenEpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date   
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;