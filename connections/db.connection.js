const mongoose = require('mongoose');

const connectDB = async () => {

  await mongoose.connect(process.env.DB_URI);
  console.log('✅ Connected to MongoDB successfully');

};

module.exports = connectDB;