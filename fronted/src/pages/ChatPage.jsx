import React, { useState } from 'react';
import Sidebar from "../components/Sidebar";
import Chat from "./Chat";
import "../styles/ChatPage.css";

export default function ChatPage() {

    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <div className="chat-container">

            {/* LEFT SIDEBAR */}
            <Sidebar
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
            />

            {/* RIGHT CHAT AREA */}
            <div className="chat-panel">
                <Chat selectedUser={selectedUser} />
            </div>

        </div>
    );
}
