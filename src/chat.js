import React, { useState } from 'react';
import './App.css'; // Подключите файл стилей для чата

const Chat = () => {
  const [messages, setMessages] = useState([]); // Хранит сообщения
  const [newMessage, setNewMessage] = useState(''); // Хранит новое сообщение

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const message = { text: newMessage, timestamp: new Date().toLocaleTimeString() };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className="chat-message">
            <div className="message-text">{message.text}</div>
            <div className="message-timestamp">{message.timestamp}</div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Введите сообщение"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Отправить</button>
      </div>
    </div>
  );
};

export default Chat;