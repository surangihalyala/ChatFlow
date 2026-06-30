import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Message, TypingUser } from "../types/chat";

const BACKEND_URL = "http://localhost:4000";

export function useSocket(username: string, roomId: string) {
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typingUsers, setTypingUsers] = useState<Map<string, string>>(new Map());
  const [connected, setConnected] = useState(false);
  const [socketId, setSocketId] = useState<string>("");

  useEffect(() => {
    const socket = io(BACKEND_URL);
    socketRef.current = socket;

    socket.on("connect", () => {
      setConnected(true);
      setSocketId(socket.id ?? "");
      socket.emit("room:join", { roomId, username });
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("message:receive", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on("typing:update", ({ userId, username: typingUsername, isTyping }: TypingUser) => {
      setTypingUsers((prev) => {
        const next = new Map(prev);
        if (isTyping) {
          next.set(userId, typingUsername);
        } else {
          next.delete(userId);
        }
        return next;
      });
    });

    socket.on("room:user_joined", ({ username: joinedUser }: { userId: string; username: string }) => {
      const systemMessage: Message = {
        id: `sys-${Date.now()}`,
        roomId,
        senderId: "system",
        senderName: "System",
        content: `${joinedUser} joined the room`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, systemMessage]);
    });

    socket.on("room:user_left", ({ userId, username: leftUser }: { userId: string; username: string }) => {
      setTypingUsers((prev) => {
        const next = new Map(prev);
        next.delete(userId);
        return next;
      });
      const systemMessage: Message = {
        id: `sys-${Date.now()}`,
        roomId,
        senderId: "system",
        senderName: "System",
        content: `${leftUser} left the room`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, systemMessage]);
    });

    return () => {
      socket.emit("room:leave", { roomId });
      socket.disconnect();
    };
  }, [username, roomId]);

  function sendMessage(content: string) {
    socketRef.current?.emit("message:send", { roomId, content });
  }

  function startTyping() {
    socketRef.current?.emit("typing:start", { roomId });
  }

  function stopTyping() {
    socketRef.current?.emit("typing:stop", { roomId });
  }

  return { messages, typingUsers, connected, socketId, sendMessage, startTyping, stopTyping };
}
