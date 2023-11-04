const mongoose = require('mongoose'); 
const bcrypt = require("bcryptjs");

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: [true, "Your username is required"],
    },
    email:{
        type:String,
        required: [true, "Your email address is required"],
        unique:true,
    },
    password:{
        type:String,
        required: [true, "Your password is required"],
    },
    role: {
        type:String,
        default: "user",
    },
    createdAt:{
        type: Date,
        default: new Date(),
    }
})

//encrypt the password
userSchema.pre('save', async function(next){
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//Export the model
const User = mongoose.model('User', userSchema);
module.exports = User;