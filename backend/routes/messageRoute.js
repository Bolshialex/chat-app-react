const express = require("express");
const router = express.Router();
const checkToken = require("../middleware/checkToken");
const messageController = require("../controllers/messageController");

router.post("/send", checkToken, messageController.sendMessage);
router.get("/:participant", checkToken, messageController.getMessages);
router.get("/", checkToken, messageController.getMessageList);

module.exports = router;
