import React, { useState, useRef, useEffect } from "react";
import './styles/Chat.css'

export default function Chat({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);

  const bottomRef = useRef(null);

  // Auto-scroll every time messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() && !file) return;

    let newMessage = { sender: "You", text: input };

    if (file) {
      if (file.type.startsWith("image/")) {
        newMessage = {
          sender: "You",
          type: "image",
          url: URL.createObjectURL(file),
          name: file.name,
        };
      } else {
        newMessage = {
          sender: "You",
          type: "file",
          url: URL.createObjectURL(file),
          name: file.name,
        };
      }
    }

    setMessages((prev) => [...prev, newMessage]);

    setInput("");
    setFile(null);
  };

  const handleFileChange = (e) => {
    if (!e.target.files[0]) return;
    setFile(e.target.files[0]);
  };

  return (
    <div className="chat-box">

      {/* Header */}
      <div className="chat-header">
        {selectedUser ? selectedUser.username : "Select a user"}
      </div>

      {/* Messages */}
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className="chat-msg">
            <strong>{msg.sender}:</strong>

            {msg.text && <p>{msg.text}</p>}

            {/* Image preview */}
            {msg.type === "image" && (
              <img src={msg.url} alt="" className="chat-image" />
            )}

            {/* File download */}
            {msg.type === "file" && (
              <a className="chat-file" href={msg.url} download>
                📄 {msg.name}
              </a>
            )}
          </div>
        ))}

        <div ref={bottomRef}></div>
      </div>

      {/* Input Section */}
      <div className="chat-input-bar">

        {/* File Upload Button */}
        <label className="upload-btn">
          📎
          <input type="file" hidden onChange={handleFileChange} />
        </label>

        {/* Text Input */}
        <input
          className="chat-input"
          placeholder="Message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        {/* Send Button */}
        <button className="send-btn" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}
