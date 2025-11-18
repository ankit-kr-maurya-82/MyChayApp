import React from "react";
import "../styles/Messages.css";

export default function MessageBubble({ msg }) {
  return (
    <div className={`message-bubble ${msg.me ? "me" : ""}`}>
      <div className="sender">{msg.sender}</div>
      <div className="text">{msg.text}</div>
    </div>
  );
}
