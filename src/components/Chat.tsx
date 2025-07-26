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
      { id: uuidv4(), text: 'Halo! aku Stefani, asisten alpro kamu! Ada yang bisa aku bantu hari ini?', sender: 'bot' }
    ]);
  }, []);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = { id: uuidv4(), text, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setIsLoading(true);

    //debug
    // console.log(`Sending message with conversation ID: ${conversationId}`);
    // console.log(`Current conversation has ${messages.length} messages`);

    try {
      const requestBody = {
        question: text,
        conversation_id: conversationId,
        // Add conversation history for better context
        conversation_history: messages.map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.text
        }))
      };

      console.log('Request payload:', requestBody);

      const response = await fetch('http://localhost:5001/api/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (!data || !data.result) {
        throw new Error('Invalid response format from the server');
      }
      //debug
      // console.log('Backend response:', data);
      
      let botResponseText = '';

      if (typeof data.result === 'string') {
        botResponseText = data.result;
      } else if (typeof data.result === 'object' && data.result !== null) {
        // Look for a string property in the response object.
        if (typeof data.result.response === 'string') {
          botResponseText = data.result.response;
        } else if (typeof data.result.text === 'string') {
          botResponseText = data.result.text;
        } else {
          // Fallback to display the raw object for debugging.
          botResponseText = "```json\n" + JSON.stringify(data.result, null, 2) + "\n```";
        }
      } else {
        botResponseText = 'Maaf, saya menerima format respons yang tidak terduga.';
      }
      
      const botMessage: Message = { id: uuidv4(), text: botResponseText, sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botMessage]);

    } catch (error) {
      console.error("Could not fetch the bot's response:", error);
      const errorMessage: Message = { id: uuidv4(), text: 'Maaf, Stefani gak bisa konek ke server, coba lagi nanti ya.', sender: 'bot' };
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
