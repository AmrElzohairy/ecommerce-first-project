const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    slug: {
        type: String,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    profileImg: String,
    password: {
        type: String,
        required: true,
        minlenght: [6, "Password must be at least 6 characters long"]
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true },);


let User = mongoose.model('User', userSchema);

module.exports = User;