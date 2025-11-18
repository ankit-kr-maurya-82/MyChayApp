import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatWindow from "../components/ChatWindow";

export default function ChatPage() {
  
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="chat-layout">
      <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />

      {/* Chat window changes based on selected user */}
      <ChatWindow selectedUser={selectedUser} />
    </div>
  );
}
