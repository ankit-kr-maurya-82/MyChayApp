import { User } from "lucide-react";

export default function Sidebar({ users, selectedUser, onSelect }) {
  return (
    <div className="w-64 bg-[#0D1117] border-r border-white/10 text-white select-none">
      <div className="p-4 border-b border-white/10 text-xl font-bold">Chats</div>

      <div className="flex flex-col">
        {users.map((u) => (
          <button
            key={u.id}
            onClick={() => onSelect(u)}
            className={`flex items-center gap-3 p-4 hover:bg-[#161B22] transition text-left ${
              selectedUser?.id === u.id ? "bg-[#161B22]" : ""
            }`}
          >
            <User className="w-6 h-6 text-gray-400" />
            <span>{u.username}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
