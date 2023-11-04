const mongoose = require('mongoose'); 
// Define a mongoose schema for token model
const tokenSchema = new mongoose.Schema({
    email: String,
    resetToken: String, // Store the reset token
    resetTokenExpiration: Date, // Store the expiration time
  });

  const Token = mongoose.model("Token", tokenSchema);
  module.exports = Token;