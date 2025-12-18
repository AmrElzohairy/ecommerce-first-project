const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
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

userSchema.pre('save', async function () {

    this.password = await bcrypt.hash(this.password, 12);

});


let User = mongoose.model('User', userSchema);

module.exports = User;