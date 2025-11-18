import React, { useState, useEffect } from 'react';

// This component displays the list of users in the sidebar
export default function UsersList({ currentUser, selectedUser, setSelectedUser }) {
    // State to hold the list of all users fetched from the server
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- 1. Fetch Users on Component Mount ---
    useEffect(() => {
        // NOTE: Replace 'YOUR_API_ENDPOINT/users' with your actual backend URL
        // This is where you would typically make an Axios call to get all users
        // For demonstration, we'll use mock data:
        const fetchUsers = async () => {
            setLoading(true);
            try {
                // Simulate an API call delay
                await new Promise(resolve => setTimeout(resolve, 500)); 
                
                const mockUsers = [
                    { id: 'user_1', username: 'System_Admin', isOnline: true },
                    { id: 'user_2', username: 'Data_Stream_1', isOnline: true },
                    { id: 'user_3', username: 'Access_Point_4', isOnline: false },
                    { id: 'user_4', username: 'Guest_User', isOnline: true },
                ];

                // Filter out the currently logged-in user
                const availableUsers = mockUsers.filter(u => u.id !== currentUser.id);

                setUsers(availableUsers);
                setError(null);

            } catch (err) {
                console.error("Error fetching users:", err);
                setError("[ERROR] Failed to load user directory.");
            } finally {
                setLoading(false);
            }
        };

        // In a real app, you might only call this once or rely on the socket for real-time updates
        fetchUsers();
    }, [currentUser.id]); // Re-fetch if currentUser changes

    // --- 2. Socket-based Real-time Status Updates (Optional but Recommended) ---
    /* useEffect(() => {
        if (socket) {
            // Listen for user connection/disconnection events
            socket.on('users status update', (updatedUsers) => {
                setUsers(updatedUsers.filter(u => u.id !== currentUser.id));
            });
            
            return () => {
                socket.off('users status update');
            };
        }
    }, [socket, currentUser.id]);
    */

    // --- 3. Render Component ---
    return (
        <div className="flex flex-col h-full">
            
            {loading && (
                <p className="text-green-500 font-mono italic">Loading user directory...</p>
            )}

            {error && (
                <p className="text-red-400 font-mono my-2">{error}</p>
            )}

            <div className="overflow-y-auto flex-grow">
                {users.length > 0 ? (
                    users.map((user) => (
                        <div
                            key={user.id}
                            onClick={() => setSelectedUser(user)}
                            // Coder style: Green border on selection, subtle hover effect
                            className={`
                                flex items-center justify-between p-3 mb-2 rounded-lg cursor-pointer transition-all font-mono text-sm
                                ${selectedUser && selectedUser.id === user.id
                                    ? 'bg-green-700/30 border border-green-500 text-white shadow-lg' // Selected state
                                    : 'bg-gray-900/50 border border-gray-700/30 text-green-300 hover:bg-gray-800' // Default state
                                }
                            `}
                        >
                            {/* User Name */}
                            <span className="truncate">
                                &gt; {user.username}
                            </span>
                            
                            {/* Online Status Indicator */}
                            <span 
                                className={`h-2 w-2 rounded-full ml-2 
                                    ${user.isOnline ? 'bg-green-400 animate-pulse' : 'bg-gray-600'}
                                `}
                                title={user.isOnline ? 'Online' : 'Offline'}
                            />
                        </div>
                    ))
                ) : (
                    !loading && <p className="text-gray-500 font-mono mt-4">No other active users found.</p>
                )}
            </div>
            
            {/* Optional: Logged-in User Footer/Status */}
            <div className="mt-auto p-4 border-t border-green-500/30 text-xs text-green-500 font-mono">
                [STATUS]: Logged in as <span className="text-white font-bold">{currentUser.username}</span>
            </div>
        </div>
    );
}