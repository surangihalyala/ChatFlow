import { useState } from "react";
import { JoinRoom } from "./components/JoinRoom";
import { ChatRoom } from "./components/ChatRoom";

interface Session {
  username: string;
  roomId: string;
}

function App() {
  const [session, setSession] = useState<Session | null>(null);

  function handleJoin(username: string, roomId: string) {
    setSession({ username, roomId });
  }

  function handleLeave() {
    setSession(null);
  }

  if (!session) {
    return <JoinRoom onJoin={handleJoin} />;
  }

  return (
    <ChatRoom
      username={session.username}
      roomId={session.roomId}
      onLeave={handleLeave}
    />
  );
}

export default App;
