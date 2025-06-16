import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

interface MessageInputProps {
  onSend: (text: string) => void;
  selectedThreadId?: number | null;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSend, selectedThreadId }) => {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Clear input when thread changes
  useEffect(() => {
    setText('');
  }, [selectedThreadId]);

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAttach = () => {
    alert('Attach button clicked (you can implement file picker here)');
  };

  return (
    <InputWrapper>
      <StyledInput
        type="text"
        placeholder="Type a message..."
        value={text}
        ref={inputRef}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <AttachButton onClick={handleAttach} title="Attach">📎</AttachButton>
      <SendButton onClick={handleSend}>Send</SendButton>
    </InputWrapper>
  );
};


const InputWrapper = styled.div`
  display: flex;
  padding: 10px;
  background-color: #f8f9fa;
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  margin-right: 8px;
  font-size: 1rem;
`;

const SendButton = styled.button`
  background-color: #0d6efd;
  color: white;
  border: none;
  padding: 8px 16px;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0b5ed7;
  }
`;

const AttachButton = styled.button`
  background: #e9ecef;
  border: none;
  padding: 8px 12px;
  margin-right: 8px;
  border-radius: 4px;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    background: #ced4da;
  }
`;