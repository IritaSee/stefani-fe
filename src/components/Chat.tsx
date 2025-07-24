import React, { useState, useEffect } from 'react';
import ChatHistory from './ChatHistory';
import ChatInput from './ChatInput';
import { v4 as uuidv4 } from 'uuid';
import './Chat.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string>('');

  useEffect(() => {
    const newConversationId = uuidv4();
    setConversationId(newConversationId);
    console.log(`New conversation started with ID: ${newConversationId}`);
    setMessages([
      { id: uuidv4(), text: 'Halo! Saya Stefani, asisten pemrograman C Anda. Ada yang bisa saya bantu hari ini?', sender: 'bot' }
    ]);
  }, []);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = { id: uuidv4(), text, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    console.log(`Sending message for conversation ID: ${conversationId}`);
    // Simulate a bot response
    // In a real application, you would make an API call to your backend here
    // The backend would then call the LLM and return the response
    const botResponse: Message = { id: uuidv4(), text: `Anda berkata: "${text}". Saya masih dalam pengembangan.`, sender: 'bot' };
    
    // Simulate a delay for the bot's response
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 500);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Stefani</h2>
        <span>Asisten Pemrograman C</span>
      </div>
      <ChatHistory messages={messages} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chat;
