export default function UsersList({ selectedUser, onSelectUser }) {
  const users = [
    { id: "1", username: "Ankit" },
    { id: "2", username: "Rahul" },
    { id: "3", username: "Sneha" },
  ];

  return (
    <div className="w-72 bg-[#0b0e15] border-r border-[#1f2428] overflow-y-auto">
      <div className="p-4 text-lg font-bold border-b border-[#1f2428] text-green-400">
        Coder Chat
      </div>

      {users.map((u) => (
        <div
          key={u.id}
          onClick={() => onSelectUser(u)}
          className={`p-4 cursor-pointer transition font-mono
            ${
              selectedUser?.id === u.id
                ? "bg-green-900/40 text-green-300 border-l-4 border-green-500"
                : "hover:bg-[#11151c]"
            }`}
        >
          {u.username}
        </div>
      ))}
    </div>
  );
}
