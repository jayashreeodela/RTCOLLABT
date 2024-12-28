const mongoose = require('mongoose');

// Define the user schema
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique in the collection
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Create the user model based on the schema
const User = mongoose.model('User', UserSchema);

module.exports = User;

