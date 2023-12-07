const Message = require('../models/message');

exports.saveMessage = async (req, res) => {
  const { messageText } = req.body;

  if (!messageText) {
    return res.status(400).json({ error: 'Content cannot be empty' });
  }

  try {
    const newMessage = new Message({ messageText });
    await newMessage.save();
    res.json({ message: 'Message saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.addComment = async (req, res) => {
  const { messageId } = req.params;
  const { commentText } = req.body;

  if (!commentText) {
    return res.status(400).json({ error: 'Comment cannot be empty' });
  }

  try {
    const message = await Message.findByIdAndUpdate(
      messageId,
      {
        $push: { comments: { commentText } },
      },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    await message.save();
    res.json({ message: 'Comment added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};