// Import necessary modules
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const colors = require("colors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

// Initialize Express app
const app = express();

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Adjust the origin to match your Vite dev server or production URL
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS if frontend and backend are on different origins

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected".bgMagenta.bold))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a simple route for testing the server
app.get("/", (req, res) => {
  res.json({ Server: "up and running" });
});

// Socket.IO Configuration
io.on("connection", (socket) => {
  console.log("New client connected");

  // Handle incoming messages from clients
  socket.on("sendMessage", (message) => {
    // Broadcast the message to all connected clients
    io.emit("receiveMessage", message);
  });

  // Handle client disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Starts server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`.bgYellow.bold)
);
