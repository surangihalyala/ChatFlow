import { useEffect, useRef } from "react";
import { Message } from "../types/chat";

interface Props {
  messages: Message[];
  currentUserId: string;
}

export function MessageList({ messages, currentUserId }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function formatTime(timestamp: number) {
    return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  return (
    <div className="message-list">
      {messages.map((msg) => {
        const isOwn = msg.senderId === currentUserId;
        const isSystem = msg.senderId === "system";

        if (isSystem) {
          return (
            <div key={msg.id} className="message-system">
              {msg.content}
            </div>
          );
        }

        return (
          <div key={msg.id} className={`message-row ${isOwn ? "own" : "other"}`}>
            {!isOwn && <span className="message-sender">{msg.senderName}</span>}
            <div className={`message-bubble ${isOwn ? "bubble-own" : "bubble-other"}`}>
              <p className="message-content">{msg.content}</p>
              <span className="message-time">{formatTime(msg.timestamp)}</span>
            </div>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
