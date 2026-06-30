import { Server, Socket } from "socket.io";

interface Message {
  id: string;
  roomId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: number;
}

export function registerChatHandlers(io: Server, socket: Socket) {
  socket.on("room:join", ({ roomId, username }: { roomId: string; username: string }) => {
    socket.join(roomId);
    socket.data.username = username;
    socket.data.roomId = roomId;

    socket.to(roomId).emit("room:user_joined", {
      userId: socket.id,
      username,
    });

    console.log(`${username} joined room ${roomId}`);
  });

  socket.on("room:leave", ({ roomId }: { roomId: string }) => {
    socket.leave(roomId);
    socket.data.roomId = undefined;
    socket.to(roomId).emit("room:user_left", {
      userId: socket.id,
      username: socket.data.username,
    });

    console.log(`${socket.data.username} left room ${roomId}`);
  });

  socket.on("message:send", ({ roomId, content }: { roomId: string; content: string }, callback: (res: { success: boolean; error?: string }) => void) => {
    const message: Message = {
      id: `${Date.now()}-${socket.id}`,
      roomId,
      senderId: socket.id,
      senderName: socket.data.username ?? "Anonymous",
      content,
      timestamp: Date.now(),
    };

    io.to(roomId).emit("message:receive", message);
    callback({ success: true });
  });

  socket.on("typing:start", ({ roomId }: { roomId: string }) => {
    socket.to(roomId).emit("typing:update", {
      userId: socket.id,
      username: socket.data.username,
      isTyping: true,
    });
  });

  socket.on("typing:stop", ({ roomId }: { roomId: string }) => {
    socket.to(roomId).emit("typing:update", {
      userId: socket.id,
      username: socket.data.username,
      isTyping: false,
    });
  });
}
