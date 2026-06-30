# 💬 ChatFlow

A real-time chat application built with **React**, **TypeScript**, **Node.js**, **Express** and **Socket.IO**.

![Tech Stack](https://img.shields.io/badge/React-18-blue?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![Socket.IO](https://img.shields.io/badge/Socket.IO-4-black?logo=socket.io) ![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)

---

## Features

- Real-time messaging with Socket.IO WebSockets
- Room-based chat — join any room by name
- Live typing indicators — see when others are typing
- Join / leave notifications
- Connection status indicator
- Messages disabled when disconnected — no silent message loss
- Dark theme UI

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React 18, TypeScript, Vite, Socket.IO Client |
| Backend | Node.js, Express 5, Socket.IO, TypeScript |
| Real-time | WebSockets via Socket.IO |
| Dev Tools | nodemon, ts-node |

---

## Project Structure

```
ChatFlow/
├── backend/
│   ├── src/
│   │   ├── index.ts              # Express + Socket.IO server
│   │   └── handlers/
│   │       └── chatHandlers.ts   # Socket event handlers
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ChatRoom.tsx       # Main chat layout
    │   │   ├── JoinRoom.tsx       # Join screen
    │   │   ├── MessageList.tsx    # Message history
    │   │   ├── MessageInput.tsx   # Input with typing detection
    │   │   └── TypingIndicator.tsx
    │   ├── hooks/
    │   │   └── useSocket.ts       # Socket.IO logic
    │   └── types/
    │       └── chat.ts            # Shared types
    └── package.json
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### 1. Clone the repository

```bash
git clone https://github.com/surangihalyala/ChatFlow.git
cd ChatFlow
```

### 2. Start the backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on `http://localhost:4000`

### 3. Configure the frontend environment

```bash
cd frontend
cp .env.example .env
```

This sets `VITE_BACKEND_URL` to point at your backend server.

### 4. Start the frontend

```bash
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

### 5. Open the app

Open two browser tabs at `http://localhost:3000`, enter a username and the same room name in both — and start chatting in real time.

---

## How It Works

```
Browser A  ──┐
             ├──  Socket.IO  ──  Node.js Server  ──  broadcasts to room
Browser B  ──┘
```

Each user gets a persistent WebSocket connection (socket). Messages, typing events, and join/leave notifications all travel through these connections in real time — no page refresh needed.

---

## Socket Events

| Event | Direction | Description |
|---|---|---|
| `room:join` | Client → Server | Join a chat room |
| `room:leave` | Client → Server | Leave a room |
| `message:send` | Client → Server | Send a message |
| `message:receive` | Server → Client | Receive a broadcast message |
| `room:user_joined` | Server → Client | Someone joined the room |
| `room:user_left` | Server → Client | Someone left the room |
| `typing:start` | Client → Server | User started typing |
| `typing:stop` | Client → Server | User stopped typing |
| `typing:update` | Server → Client | Typing state broadcast |

---

## Author

**Surangi** — [GitHub](https://github.com/surangihalyala)
