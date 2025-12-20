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
        minlenght: [6, "Password must be at least 6 characters long"],
        select: false
    },
    passwordChangedAt: {
        type: Date,
        select: false
    },
    passwordResetCode: {
        type: String,
        select: false
    },
    passwordResetExpires: {
        type: Date,
        select: false
    },
    passwordResetVerified: {
        type: Boolean,
        select: false,
        default: false
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'manager'],
        default: 'user'
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true },);

userSchema.pre('save', async function () {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 12);

});


// Remove __v from responses
userSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.__v;
        return ret;
    }
});

userSchema.set('toObject', {
    transform: function (doc, ret) {
        delete ret.__v;
        return ret;
    }
});



let User = mongoose.model('User', userSchema);

module.exports = User;