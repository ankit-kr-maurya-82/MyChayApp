import React, { useState, useEffect } from 'react';
import { User, Activity } from "lucide-react"; // Importing relevant icons
// Assuming your UsersList component is defined here:
import UsersList from "./UsersList"; 

// NOTE: This component assumes it receives necessary props from App.jsx, 
// such as the authenticated user and the selection setter.

export default function Sidebar({ currentUser, selectedUser, setSelectedUser }) {
    
    // --- Mock Data Setup for Display ---
    // In a real app, this data would come from context or props.
    const mockCurrentUser = { id: 'alice_101', username: 'System_Admin' }; 
    const mockUsers = [
        { id: 'user_2', username: 'Data_Stream_1', isOnline: true },
        { id: 'user_3', username: 'Access_Point_4', isOnline: false },
        { id: 'user_4', username: 'Guest_User', isOnline: true },
    ];
    // Use mock data if real props aren't available for UI testing
    const finalCurrentUser = currentUser || mockCurrentUser;
    const [users, setUsers] = useState(mockUsers); // State to hold the user list
    // ------------------------------------

    // In a final application, you would replace the mock data above with a 
    // useEffect hook to fetch/update the user list (like in UsersList.jsx).

    // --- Placeholder function for selection (uses mock data structure) ---
    const handleUserSelection = (user) => {
        // This would call setSelectedUser(user) if real props were passed.
        console.log(`User selected: ${user.username}`);
        // For UI purposes, we'll simulate setting the selected user here if needed
        // setSelectedUser(user); 
    };

    return (
        // Sidebar Container: Uses the deep dark background and fixed width
        <div className="w-64 bg-[#010409] border-r border-green-500/20 text-[#c9d1d9] font-mono select-none flex flex-col h-full">
            
            {/* Header: Coder style title */}
            <div className="p-4 border-b border-green-500/30 text-xl font-bold text-green-400">
                // Added a terminal prompt look
                &gt; USER_CHANNELS
            </div>

            {/* List of Users/Chats (Core Content Area) */}
            <div className="flex flex-col flex-grow overflow-y-auto p-4">
                
                {/* --- Mapped User List Items --- */}
                {users.map((user) => (
                    <div
                        key={user.id}
                        onClick={() => handleUserSelection(user)}
                        // Apply the neon-green focus styling on hover/selection
                        className={`
                            flex items-center justify-between p-3 mb-2 rounded-lg cursor-pointer transition-all text-sm
                            ${selectedUser && selectedUser.id === user.id
                                ? 'bg-green-700/30 border border-green-500 text-white shadow-lg' // Selected state
                                : 'bg-gray-900/50 border border-gray-700/30 text-green-300 hover:bg-gray-800' // Default state
                            }
                        `}
                    >
                        {/* User Icon and Name */}
                        <div className="flex items-center truncate">
                            <User className="w-4 h-4 mr-2 text-green-400" />
                            <span className="truncate">{user.username}</span>
                        </div>
                        
                        {/* Status Indicator */}
                        <span 
                            className={`h-2 w-2 rounded-full ml-2 
                                ${user.isOnline ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}
                            `}
                            title={user.isOnline ? 'Active' : 'Offline'}
                        />
                    </div>
                ))}
            </div>

            {/* Footer: Logged-in User Status */}
            <div className="mt-auto p-4 border-t border-green-500/30 text-xs text-green-500">
                <div className="flex items-center">
                    <Activity className="w-3 h-3 mr-2 text-green-400" />
                    [STATUS]: {finalCurrentUser.username}
                </div>
            </div>
        </div>
    );
}