import { useState } from "react";
import { JoinRoom } from "./components/JoinRoom";
import { ChatRoom } from "./components/ChatRoom";

interface Session {
  username: string;
  roomId: string;
}

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [joinError, setJoinError] = useState<string | null>(null);

  function handleJoin(username: string, roomId: string) {
    setSession({ username, roomId });
  }

  function handleLeave() {
    setSession(null);
  }
  function handleJoinFailed(error: string) {
    setJoinError(error);
    setSession(null);
  }
  if (!session) {
    return <JoinRoom onJoin={handleJoin} error={joinError} />;
  }

  return (
    <ChatRoom
      username={session.username}
      roomId={session.roomId}
      onLeave={handleLeave}
      onJoinFailed={handleJoinFailed}
    />
  );
}

export default App;
