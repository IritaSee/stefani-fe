import React from 'react';
import ReactMarkdown from 'react-markdown';
import './Chat.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

interface ChatHistoryProps {
  messages: Message[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => {
  return (
    <div className="chat-history">
      {messages.map((message) => (
        <div key={message.id} className={`message-container message-${message.sender}`}>
            <div className={`message-bubble`}>
                {message.sender === 'bot' ? (
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                ) : (
                    message.text
                )}
            </div>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;
