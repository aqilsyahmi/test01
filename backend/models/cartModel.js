const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
const cartSchema = new mongoose.Schema({
    product_id:{
        type:String,
    },
    user_id:{
        type:String,
        unique: false // Set unique to false to allow non-unique values
    },
    name:{
        type:String,
        unique: false // Set unique to false to allow non-unique values
    },
    quantity:{
        type: Number,
        unique: false // Set unique to false to allow non-unique values
    },
    price:{
        type: Number,
        unique: false // Set unique to false to allow non-unique values
    },
    createdAt:{
        type: Date,

        default: new Date(),
    },
    updatedAt:{
        type: Date,

        default: new Date(),
    }
})

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;