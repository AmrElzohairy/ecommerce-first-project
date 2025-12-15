const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Brand name is required'],
            unique: [true, 'Brand name must be unique'],
            trim: true,
            minlength: [3, 'Brand name must be at least 3 characters long'],
            maxlength: [50, 'Brand name must be at most 50 characters long'],
        },
        slug: {
            type: String,
            lowercase: true,
        },
        image: {
            type: String,
        }
    }, {
    timestamps: true,
}
)
let Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;