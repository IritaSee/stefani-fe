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
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5001/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: text,
          conversation_id: conversationId,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botMessage: Message = { id: uuidv4(), text: data.result, sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botMessage]);

    } catch (error) {
      console.error("Could not fetch the bot's response:", error);
      const errorMessage: Message = { id: uuidv4(), text: 'Maaf, saya sedang mengalami gangguan. Silakan coba lagi nanti.', sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Stefani</h2>
        <span>Asisten Pemrograman C</span>
      </div>
      <ChatHistory messages={messages} isLoading={isLoading} />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chat;
