// validate the inputs
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Conversation = require("../models/conversationModel");

const getMessages = async (req, res) => {
  const { participant } = req.params;
  const senderId = req.user.id;
  try {
    const participantInfo = await User.findById({ _id: participant });
    if (!participantInfo) {
      return res.status(404).json({ message: "Participant not found" });
    }

    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: participantInfo._id },
        { sender: participantInfo._id, receiver: senderId },
      ],
    })
      .select("content sender")
      .populate("sender", "username");

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//receiver or sender where id is not equal to the current user id
const getMessageList = async (req, res) => {
  const userId = req.user.id;
  try {
    const conversations = await Conversation.find({
      participants: userId,
    })
      .select("participants lastMessage")
      .populate({ path: "participants", select: "username" })
      .populate({ path: "lastMessage", select: "content" });

    const filteredConversations = conversations.map((conversation) => {
      const filteredParticipants = conversation.participants.filter(
        (participant) => participant._id.toString() !== userId.toString()
      );

      return {
        ...conversation.toObject(),
        participants: filteredParticipants,
      };
    });

    res.status(200).json(filteredConversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sendMessage = async (req, res) => {
  const { content, receiver } = req.body;
  const sender = req.user.id;
  console.log(req);
  try {
    const receiverUser = await User.findOne({ username: receiver });
    if (!receiverUser) {
      return res.status(404).json({ message: "Receiver not found" });
    }
    const receiverId = receiverUser._id;

    let conversation = await Conversation.findOne({
      participants: {
        $all: [sender, receiverId],
      },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [sender, receiverId],
      });
      await conversation.save();
    }

    const message = new Message({
      sender: sender,
      receiver: receiverId,
      content,
      conversation: conversation._id,
    });

    const createdMessage = await message.save();

    conversation.lastMessage = createdMessage._id;
    await conversation.save();

    res.status(201).json(createdMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMessages, sendMessage, getMessageList };
