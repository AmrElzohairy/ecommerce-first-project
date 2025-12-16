const mongoose = require('mongoose');

let productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Product title is required'],
        trim: true,
        minlength: [3, 'Product title must be at least 3 characters long'],
        maxlength: [50, 'Product title must be at most 50 characters long'],
    },
    slug: {
        type: String,
        required: [true, 'Product slug is required'],
        lowercase: true,
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'Product quantity is required'],
    },
    sold: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        trim: true,
        required: [true, 'Product price is required'],
        min: [0, 'Product price must be at least 0'],
        max: [20, 'Product price must be at most 20 characters long'],
    },
    priceAfterDiscount: {
        type: Number,
        trim: true,
        min: [0, 'Product price must be at least 0'],
        max: [20, 'Product price must be at most 20 characters long'],
    },
    colors: [String],
    imageCover: { type: String, required: [true, 'Product image cover is required'] },
    images: [String],
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: true
    },
    subCategory: [{
        type: mongoose.Schema.ObjectId,
        ref: 'SubCategory',
    }],
    brand: {
        type: mongoose.Schema.ObjectId,
        ref: 'Brand',
        required: true
    },
    ratingsAverage: {
        type: Number,
        default: 1,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating must be at most 5'],
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
}

    , {
        timestamps: true,
    });

let Product = mongoose.model('Product', productSchema);

module.exports = Product;