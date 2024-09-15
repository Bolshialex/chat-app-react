const express = require("express");
const router = express.Router();
const checkToken = require("../middleware/checkToken");
const userController = require("../controllers/userController");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/search", checkToken, userController.getAllUsers);
router.get("/search/:username", checkToken, userController.getUserByUserName);
router.put("/update", checkToken, userController.updateUser);
router.get("/", checkToken, userController.getUser);

module.exports = router;
