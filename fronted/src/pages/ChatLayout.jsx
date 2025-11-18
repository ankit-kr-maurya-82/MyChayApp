import { useEffect, useRef, useState } from "react";

export default function ChatLayout() {
  const [messages, setMessages] = useState([
    "Welcome to the chat!",
    "This is a demo message."
  ]);

  const [input, setInput] = useState("");
  const bottomRef = useRef(null);
  const textRef = useRef(null);

  // Auto-scroll messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-expand textarea
  const handleTyping = (e) => {
    setInput(e.target.value);

    // Auto resize while typing
    const el = textRef.current;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
    el.scrollTop = el.scrollHeight;
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, input]);
    setInput("");

    // Reset input height
    const el = textRef.current;
    el.style.height = "40px";
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-[#1e1f22] text-white">

      {/* ---------- Sidebar ---------- */}
      <div className="w-64 bg-[#2b2d31] border-r border-gray-700 p-4">
        <h2 className="text-lg font-bold mb-4">Servers</h2>
        <div className="space-y-2">
          <div className="p-2 bg-[#393b40] rounded">General</div>
          <div className="p-2 hover:bg-[#393b40] rounded">Coding</div>
          <div className="p-2 hover:bg-[#393b40] rounded">Help</div>
        </div>
      </div>

      {/* ---------- Chat Section ---------- */}
      <div className="flex flex-col flex-1">

        {/* Chat Header */}
        <div className="p-4 bg-[#313338] border-b border-gray-700">
          <h2 className="text-xl font-bold"># general</h2>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className="p-2 bg-[#2b2d31] rounded-lg w-fit max-w-[70%]">
              {msg}
            </div>
          ))}

          <div ref={bottomRef} />
        </div>

        {/* Input Box */}
        <div className="p-4 bg-[#313338]">
          <textarea
            ref={textRef}
            value={input}
            onChange={handleTyping}
            onKeyDown={handleKey}
            placeholder="Message #general"
            className="w-full bg-[#1e1f22] p-3 rounded-lg outline-none resize-none overflow-hidden"
            style={{ height: "40px" }}
            rows={1}
          ></textarea>
        </div>

      </div>
    </div>
  );
}
