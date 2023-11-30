const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  commentText: String,
  timestamp: { type: Date, default: Date.now },
});

const messageSchema = new mongoose.Schema({
    message: String,
    timestamp: { type: Date, default: Date.now },
  });
  
  module.exports = mongoose.model('Message', messageSchema);