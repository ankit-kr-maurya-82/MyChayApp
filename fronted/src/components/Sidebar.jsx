import React, { useState } from 'react';
import { User, Activity } from "lucide-react";
// import UsersList from "./UsersList"; 

export default function Sidebar({ currentUser, selectedUser, setSelectedUser }) {
    
    // Mock data for UI testing
    const mockCurrentUser = { id: 'alice_101', username: 'System_Admin' }; 
    const mockUsers = [
        { id: 'user_2', username: 'Data_Stream_1', isOnline: true },
        { id: 'user_3', username: 'Access_Point_4', isOnline: false },
        { id: 'user_4', username: 'Guest_User', isOnline: true },
    ];

    const finalCurrentUser = currentUser || mockCurrentUser;
    const [users] = useState(mockUsers);

    const handleUserSelection = (user) => {
        console.log(`User selected: ${user.username}`);
        if (setSelectedUser) setSelectedUser(user);
    };

    return (
        <div className="w-64 bg-[#010409] border-r border-green-500/20 
                        text-[#c9d1d9] font-mono select-none flex flex-col h-full">

            {/* Header */}
            <div className="p-4 border-b border-green-500/30 text-xl font-bold text-green-400">
                {/* Terminal Channel Label */}
                &gt; USER_CHANNELS
            </div>

            {/* User List */}
            <div className="flex flex-col flex-grow overflow-y-auto p-4">

                {users.map((user) => (
                    <div
                        key={user.id}
                        onClick={() => handleUserSelection(user)}
                        className={`
                            flex items-center justify-between p-3 mb-2 rounded-lg cursor-pointer
                            transition-all text-sm duration-200
                            ${
                                selectedUser && selectedUser.id === user.id
                                ? 'bg-green-700/30 border border-green-500 text-white shadow-lg'
                                : 'bg-gray-900/50 border border-gray-700/30 text-green-300 hover:bg-gray-800'
                            }
                        `}
                    >
                        {/* Username + Icon */}
                        <div className="flex items-center truncate">
                            <User className="w-4 h-4 mr-2 text-green-400" />
                            <span className="truncate">{user.username}</span>
                        </div>

                        {/* Status Dot */}
                        <span 
                            className={`h-2 w-2 rounded-full ml-2 
                                ${user.isOnline ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}
                            `}
                            title={user.isOnline ? 'Active' : 'Offline'}
                        />
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="mt-auto p-4 border-t border-green-500/30 text-xs text-green-500">
                <div className="flex items-center">
                    <Activity className="w-3 h-3 mr-2 text-green-400" />
                    [STATUS]: {finalCurrentUser.username}
                </div>
            </div>
        </div>
    );
}
