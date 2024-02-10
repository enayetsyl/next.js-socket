// pages/api/socket.js

import { Server } from "socket.io";

const socketFunction =  async (req, res) => {
  if (req.method === "POST") {
    const io = new Server();

    io.on("connection", (socket) => {
      console.log(`User Connected: ${socket.id}`);

      socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
      });

      socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
      });

      socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
      });
    });

    io.listen(); // Adjust the port as needed

    return res.status(200).json({ message: "Socket.io server started" });
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
};


export default socketFunction