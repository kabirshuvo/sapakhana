import mongoose from "mongoose";
// using this userModel into nextjs app
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an email "],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide an email "],
  },
  isVerified: {
    type: Boolean,
    required: false,
  },
  isAdmin: {
    type: Boolean,
    required: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  veryfyTokenExpiry: Date,
});

// In this ts file I want to create a complete user model please help.
