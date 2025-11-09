import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true // No two users can have the same email
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'instructor'], // Only allows these two values
    default: 'student'
  }
},{timestamps: true});

const User =mongoose.models.user || mongoose.model('user',userSchema);

export default User;