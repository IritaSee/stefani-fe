import React, { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSendClick = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendClick();
    }
  };

  return (
    <div className="chat-input">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="sok atuh tanyain aja..."
      />
      <button onClick={handleSendClick}>Kirim</button>
    </div>
  );
};

export default ChatInput;
