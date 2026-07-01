import { useSocket } from "../hooks/useSocket";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { TypingIndicator } from "./TypingIndicator";

interface Props {
  username: string;
  roomId: string;
  onLeave: () => void;
}

export function ChatRoom({ username, roomId, onLeave }: Props) {
  const { messages, typingUsers, connected, socketId, error, sendMessage, startTyping, stopTyping } =
  useSocket(username, roomId);
  return (
    <div className="chatroom">
      <header className="chatroom-header">
        <div>
          <h2 className="chatroom-title">#{roomId}</h2>
          <span className={`status-dot ${connected ? "online" : "offline"}`}>
            {connected ? "Connected" : "Disconnected"}
          </span>
        </div>
        <button className="btn-leave" onClick={onLeave}>
          Leave
        </button>
      </header>

      <MessageList messages={messages} currentUserId={socketId} />

      <div className="chatroom-footer">
        {error && <div className="error-banner">{error}</div>}
        <TypingIndicator typingUsers={typingUsers} />
        <MessageInput
          onSend={sendMessage}
          onTypingStart={startTyping}
          onTypingStop={stopTyping}
          connected={connected}
        />
      </div>
    </div>
  );
}
