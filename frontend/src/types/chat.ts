export interface Message {
  id: string;
  roomId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: number;
}

export interface TypingUser {
  userId: string;
  username: string;
  isTyping: boolean;
}
