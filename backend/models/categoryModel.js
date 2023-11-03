const mongoose = require('mongoose'); 

// category model
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 20,
        unique:true,
        index: true,
    },
    description: {
        type: String,
        required: true,
        maxLength: 50,
    },
}, {timestamps: true});

// Export the model
const Category = mongoose.model('Category', categorySchema);
module.exports = Category;