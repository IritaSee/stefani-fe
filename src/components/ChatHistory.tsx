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
  isLoading: boolean;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages, isLoading }) => {
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
      {isLoading && (
        <div className="message-container message-bot">
          <div className="message-bubble">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatHistory;
