const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  commentText: String,
  timestamp: { type: Date, default: Date.now },
});

const messageSchema = new mongoose.Schema({
  messageId: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  messageText: String,
  messageTimestamp: { type: Date, default: Date.now },
  comments: [commentSchema],
});

module.exports = mongoose.model('Message', messageSchema);