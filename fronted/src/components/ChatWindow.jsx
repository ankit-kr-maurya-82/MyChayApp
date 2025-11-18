import React, { useState } from "react";
import MessageBubble from "./MessageBubble";
import "../styles/ChatWindow.css";
import { Send } from "lucide-react";

export default function ChatWindow({ selectedUser }) {

  const [messages, setMessages] = useState([
    { id: 1, sender: "System_Admin", text: "Hello! Connected to server.", me: false },
  ]);

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim().length === 0) return;

    setMessages([
      ...messages,
      { id: Date.now(), sender: "You", text: input, me: true },
    ]);

    setInput("");
  };

  return (
    <div className="chat-window">

      {/* Top Header */}
      <div className="chat-header">
        {selectedUser ? selectedUser.username : "Select a User"}
      </div>

      {/* Messages Area */}
      <div className="chat-messages">
        {messages.map(msg => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
      </div>

      {/* Input Bar */}
      <div className="chat-input-area">
        <input
          className="chat-input"
          placeholder="Message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />

        <button className="send-btn" onClick={sendMessage}>
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
