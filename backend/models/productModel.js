const mongoose = require('mongoose'); 

// product model
const productSchema = new mongoose.Schema({
    image: {
        type: String, 
        required: true
    },
    product_name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 60
    },
    product_desc: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    _category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    }
}, {timestamps: true})

productSchema.index({ product_name: 'text' });
const Product = mongoose.model("Product", productSchema)
module.exports = Product;