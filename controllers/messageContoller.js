import { Message } from "../models/messageSchema.js";
export const sendMessage = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, message } = req.body;
    if (!firstName || !lastName || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "Please enter all details",
      });
    }
    await Message.create({ firstName, lastName, email, phone, message });
    return res.status(200).json({
      success: true,
      message: "message send successfully",
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const getAllMessages = async (req, res, next) => {
  try {
    const messages = await Message.find();
    res.status(200).json({ messages });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    let message = await Message.findById(id);
    if (!message) {
      return res.status(400).json({ message: "message don't exists" });
    }
    await message.deleteOne();
    return res.status(200).json({ message: "message successfully deleted" });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
