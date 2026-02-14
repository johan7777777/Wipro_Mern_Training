// Real-time Chat Server using Socket.io

const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);


app.use(express.static("pages"));

io.on("connection", socket => {
  console.log(" User connected:", socket.id);

// listener
  socket.on("chatMessage", msg => {
    console.log("Message received:", msg);

   //emit or send the message
    io.emit("chatMessage", msg);
  });

  socket.on("disconnect", () => {
    console.log(" User disconnected:", socket.id);
  });
});

server.listen(5001, () => {
  console.log(" Server running ");
});