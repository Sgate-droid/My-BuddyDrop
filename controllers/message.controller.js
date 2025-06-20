import { Message } from "../models/index.js";

export const sendMessage = async (req, res) => {
  const { receiverId, content } = req.body;
  try {
    const message = await Message.create({
      senderId: req.user.id,
      receiverId,
      content,
    });
    res.status(201).json({ message: "Message sent", data: message });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMessages = async (req, res) => {
  const { userId } = req.params;
  try {
    const messages = await Message.findAll({
      where: {
        senderId: req.user.id,
        receiverId: userId,
      },
    });
    res.status(200).json({ messages });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

