const mongoose = require('mongoose');


const subCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Category name is required'],
            unique: [true, 'Category name must be unique'],
            trim: true,
            minlength: [3, 'Category name must be at least 3 characters long'],
            maxlength: [50, 'Category name must be at most 50 characters long'],
        },
        slug: {
            type: String,
            lowercase: true,
        },
        category: {
            type: mongoose.Schema.ObjectId,
            ref: 'Category',
            required: true
        }
    }, {
    timestamps: true,
}
);

let SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;