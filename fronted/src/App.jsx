import { useState } from "react";
import UsersList from "./UsersList";
import Chat from "./pages/Chat";
import Login from "./pages/Login";

export default function App({ user, socket }) {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="flex h-screen bg-[#0d0f10] text-[#c9d1d9] font-mono">
     <Login/>
     
    </div>
  );
}
