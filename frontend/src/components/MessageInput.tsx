import { useState, FormEvent, useRef, useEffect } from "react";

interface Props {
  onSend: (content: string) => void;
  onTypingStart: () => void;
  onTypingStop: () => void;
  connected: boolean;
}

const TYPING_TIMEOUT_MS = 1500;
export function MessageInput({ onSend, onTypingStart, onTypingStop, connected }: Props) {
  const [text, setText] = useState("");
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isTypingRef = useRef(false);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    };
  }, []);

  function handleChange(value: string) {
    setText(value);

    if (!isTypingRef.current) {
      isTypingRef.current = true;
      onTypingStart();
    }

    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);

    typingTimerRef.current = setTimeout(() => {
      isTypingRef.current = false;
      onTypingStop();
    }, TYPING_TIMEOUT_MS);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;

    onSend(text.trim());
    setText("");

    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    isTypingRef.current = false;
    onTypingStop();
  }

  return (
    <form className="message-input-row" onSubmit={handleSubmit}>
      <input
        className="input message-input"
        disabled={!connected}
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        autoComplete="off"
      />
      <button className="btn-primary btn-send" type="submit" disabled={!connected}>
        Send
      </button>
    </form>
  );
}
