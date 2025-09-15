import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let onlineUsers = 0;

io.on("connection", (socket) => {
  onlineUsers++;
  io.emit("userCount", onlineUsers);

  socket.on("disconnect", () => {
    onlineUsers--;
    io.emit("userCount", onlineUsers);
  });
});

app.use(express.static("public"));

server.listen(3000, () => {
  console.log("✅ Server is running! Open http://localhost:3000");
});
