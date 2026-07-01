import { useState, FormEvent } from "react";

interface Props {
  onJoin: (username: string, roomId: string) => void;
  error?: string | null;
}

export function JoinRoom({ onJoin, error }: Props) {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (username.trim() && roomId.trim()) {
      onJoin(username.trim(), roomId.trim());
    }
  }

  return (
    <div className="join-container">
      <div className="join-card">
        <h1 className="join-title">💬 ChatFlow</h1>
        <p className="join-subtitle">Join a room to start chatting</p>
        {error && <div className="error-banner">{error}</div>}
        <form onSubmit={handleSubmit} className="join-form">
          <input
            className="input"
            type="text"
            placeholder="Your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            maxLength={30}
            required
          />
          <input
            className="input"
            type="text"
            placeholder="Room name (e.g. general)"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            maxLength={30}
            required
          />
          <button className="btn-primary" type="submit">
            Join Room
          </button>
        </form>
      </div>
    </div>
  );
}
