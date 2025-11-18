import React, { useState, useRef, useEffect } from "react";
import "./styles/Chat.css";

export default function Chat({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() && !file) return;

    let newMessage = {
      sender: "You",
      avatar: "/you.png", // your avatar (replace)
      self: true,
      type: "text",
      text: input,
    };

    if (file) {
      newMessage = {
        sender: "You",
        avatar: "/you.png",
        self: true,
        type: file.type.startsWith("image/") ? "image" : "file",
        url: URL.createObjectURL(file),
        name: file.name,
      };
    }

    setMessages((prev) => [...prev, newMessage]);

    setInput("");
    setFile(null);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="chat-box">

      {/* Header */}
      <div className="chat-header">
        {selectedUser ? selectedUser.username : "Select a User"}
      </div>

      {/* Messages */}
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-row ${msg.self ? "right" : "left"}`}
          >
            {/* Avatar */}
            <img
              src={msg.avatar || "/default-user.png"}
              alt="Avatar"
              className="chat-avatar"
            />

            {/* Bubble */}
            <div className="chat-msg">
              <div className="chat-sender">{msg.sender}</div>

              {msg.text && (
                <p className="chat-text">{msg.text}</p>
              )}

              {msg.type === "image" && (
                <img src={msg.url} alt="" className="chat-image" />
              )}

              {msg.type === "file" && (
                <a className="chat-file" href={msg.url} download>
                  {msg.name}
                </a>
              )}
            </div>
          </div>
        ))}

        <div ref={bottomRef}></div>
      </div>

      {/* Input */}
      <div className="chat-input-bar">
        <label className="upload-btn">
          📎
          <input type="file" hidden onChange={handleFileChange} />
        </label>

        <input
          className="chat-input"
          placeholder="Message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <button className="send-btn" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}
