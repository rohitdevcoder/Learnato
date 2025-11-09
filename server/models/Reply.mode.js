// models/Reply.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ReplySchema = new Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: 'Anonymous'
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  isAnswer: { // <-- ADD THIS FIELD
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export const Reply = mongoose.model('Reply', ReplySchema);