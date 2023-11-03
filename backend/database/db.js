const mongoose = require('mongoose');
require('dotenv').config(); //test Load environment variables from .env 
const{MONGO_URI} = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB is connected successfully");
  } catch (err) {
    console.error(err);
  }
}

module.exports = connectDB;
