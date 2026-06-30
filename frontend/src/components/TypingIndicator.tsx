interface Props {
  typingUsers: Map<string, string>;
}

export function TypingIndicator({ typingUsers }: Props) {
  const names = Array.from(typingUsers.values());

  if (names.length === 0) return null;

  const label =
    names.length === 1
      ? `${names[0]} is typing...`
      : `${names.slice(0, -1).join(", ")} and ${names.at(-1)} are typing...`;

  return (
    <div className="typing-indicator">
      <span className="typing-dots">
        <span /><span /><span />
      </span>
      {label}
    </div>
  );
}
