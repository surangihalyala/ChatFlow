import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { registerChatHandlers } from "./handlers/chatHandlers";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
  pingTimeout: 5000,

});

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  registerChatHandlers(io, socket);

  socket.on("disconnect", () => {
    const { username, roomId } = socket.data;
    if (roomId && username) {
      socket.to(roomId).emit("room:user_left", {
        userId: socket.id,
        username,
      });
    }
  });
});

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
