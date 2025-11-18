import React, { useState } from 'react';
import { User, Activity } from "lucide-react";
import "../styles/Sidebar.css"; // external css

export default function Sidebar({ currentUser, selectedUser, setSelectedUser }) {
    
    const mockCurrentUser = { id: 'alice_101', username: 'System_Admin' };
    const mockUsers = [
        { id: 'user_2', username: 'Data_Stream_1', isOnline: true },
        { id: 'user_3', username: 'Access_Point_4', isOnline: false },
        { id: 'user_4', username: 'Guest_User_1', isOnline: true },
        { id: 'user_5', username: 'Guest_User_2', isOnline: true },
        { id: 'user_6', username: 'Guest_User_3', isOnline: true },
        { id: 'user_7', username: 'Guest_User_4', isOnline: true },
        { id: 'user_9', username: 'Guest_User', isOnline: true },
        { id: 'user_10', username: 'Guest_User', isOnline: true },
        { id: 'user_11', username: 'Guest_User', isOnline: true },
        { id: 'user_12', username: 'Guest_User', isOnline: true },
        { id: 'user_13', username: 'Guest_User', isOnline: true },
        { id: 'user_14', username: 'Guest_User', isOnline: true },
        { id: 'user_15', username: 'Guest_User', isOnline: true },
        { id: 'user_16', username: 'Guest_User', isOnline: true },
        { id: 'user_17', username: 'Guest_User', isOnline: true },
        { id: 'user_18', username: 'Guest_User', isOnline: true },
    ];

    const finalCurrentUser = currentUser || mockCurrentUser;
    const [users] = useState(mockUsers);

    const handleUserSelection = (user) => {
        if (setSelectedUser) setSelectedUser(user);
    };

    return (
        <div className="discord-sidebar">

            {/* Top Section */}
            <div className="sidebar-header">
                <h3>Chats</h3>
            </div>

            {/* User List */}
            <div className="sidebar-users">
                {users.map((user) => (
                    <div
                        key={user.id}
                        onClick={() => handleUserSelection(user)}
                        className={
                            selectedUser?.id === user.id
                                ? "user-item active-user"
                                : "user-item"
                        }
                    >
                        <div className="user-avatar">
                            <User size={18} />
                            <span
                                className={`status-dot ${user.isOnline ? "online" : "offline"}`}
                            />
                        </div>
                        <span className="username">{user.username}</span>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="sidebar-footer">
                <Activity size={16} />
                <span>{finalCurrentUser.username}</span>
            </div>
        </div>
    );
}
