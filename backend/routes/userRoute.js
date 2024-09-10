const express = require("express");
const router = express.Router();
const checkToken = require("../middleware/checkToken");
const userController = require("../controllers/userController");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/users", checkToken, userController.getAllUsers);
router.get("/:username", checkToken, userController.getUserByUserName);

module.exports = router;
