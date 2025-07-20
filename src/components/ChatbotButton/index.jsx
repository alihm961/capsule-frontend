import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const ChatbotButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ role: 'assistant', content: "Hello, welcome to the future! You can ask me anything." }]);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, newMessage]);
    setInput('');

    try {
      await delay(2000); 

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-3.5-turbo",
          messages: [...messages, newMessage],
        },
        {
          headers: {
            Authorization:`Bearer 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`,
            'Content-Type': 'application/json',
          },
        }
      );

      const botMessage = response.data.choices[0].message;
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbox">
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.role}`}>
                {msg.content}
              </div>
            ))}
          </div>
          <div className="input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}

      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        🤖
      </button>
    </div>
  );
};

export default ChatbotButton;


