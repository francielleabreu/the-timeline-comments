const Message = require('../models/message');

exports.saveMessage = async (req, res) => {
  const { message } = req.body;
  console.log(message)

  if (!message) {
    return res.status(400).json({ error: 'Content cannot be empty' });
  }

  try {
    const newMessage = new Message({ message: message });
    await newMessage.save();
    res.json({ message: 'Message saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
  
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};