import React, { useState, useEffect, useRef } from 'react';
import './styles/Chat.css'; // Make sure to create this file!

const Chat = () => {
  // State for messages and current input
  const [messages, setMessages] = useState([
    { id: 1, text: "System Boot initiated. Please enter your command.", sender: 'bot' },
    { id: 2, text: "I need to check my account status.", sender: 'user' },
    { id: 3, text: "Accessing database... User credentials confirmed. Status: ACTIVE.", sender: 'bot' },
  ]);
  const [input, setInput] = useState('');

  // Ref to automatically scroll to the newest message
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the message list whenever messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Function to handle sending a message
  const handleSend = (e) => {
    e.preventDefault();
    const messageText = input.trim();
    if (messageText === '') return;

    const newMessage = {
      id: messages.length + 1,
      text: messageText,
      sender: 'user', 
    };
    
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput('');
    
    // Simple mock bot response logic
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: `Executing command: "${messageText}". Reply code 200.`,
        sender: 'bot',
      };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 800);
  };

  return (
    // Outer container for full-screen centering and dark theme
    <div className='chat-page-container'>
      
      {/* Inner container for the chat box structure and aesthetic */}
      <div className='chat-window-container'> 
        
        <header className='chat-header'>
          {/* Using neon-title for the thematic look */}
          <h2 className='neon-title'>| CONSOLE CHAT </h2>
        </header>

        {/* Message Display Area */}
        <div className='message-list'>
          {messages.map((message) => (
            <div key={message.id} className={`message-line ${message.sender}`}>
              <span className='timestamp'>[{new Date().toLocaleTimeString()}]</span>
              <span className='prompt-indicator'>{message.sender === 'user' ? '>>' : 'CMD:'}</span>
              <span className='message-text'>{message.text}</span>
            </div>
          ))}
          {/* Element to scroll to */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} className='chat-input-form'>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ENTER COMMAND HERE..."
            className='chat-input'
          />
          <button type="submit" className='send-button submit-button'>Send >></button>
        </form>
        
      </div>
    </div>
  );
};

export default Chat;