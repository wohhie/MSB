import React from 'react';
import styled from 'styled-components';
import { MessageInput } from './MessageInput';

interface Message {
  id: number;
  sender: string;
  text: string;
  pinned?: boolean;
}

interface Thread {
  id: number;
  name: string;
  messages: Message[];
}

interface MessageThreadProps {
  threads: Thread[];
  selectedThreadId: number | null;
  setThreads: React.Dispatch<React.SetStateAction<Thread[]>>;
  setSelectedThreadId: (id: number | null) => void;
  setPinnedMessageId: (id: number | null) => void;
  pinnedMessageId: number | null;
}

export function MessageThread({
  threads,
  selectedThreadId,
  setThreads,
  setPinnedMessageId,
}: MessageThreadProps) {
  const selectedThread = threads.find(t => t.id === selectedThreadId);

  const handleSendMessage = (text: string) => {
    if (!text.trim() || selectedThreadId === null) return;

    const newMessage: Message = {
      id: Date.now(),
      sender: 'Me',
      text: text.trim(),
    };

    setThreads(prev =>
      prev.map(thread =>
        thread.id === selectedThreadId
          ? { ...thread, messages: [...thread.messages, newMessage] }
          : thread
      )
    );
  };

  return (
    <Container>
      {selectedThread ? (
        <>
          <ScrollableMessageList>
            {selectedThread.messages.map(message => (
              <MessageBubble key={message.id} isMe={message.sender === 'Me'}>
                <MessageText>
                  <strong>{message.sender}:</strong> {message.text}
                </MessageText>
                <PinButton onClick={() => setPinnedMessageId(message.id)}>📌</PinButton>
              </MessageBubble>
            ))}
          </ScrollableMessageList>

          <FixedInput>
            <MessageInput key={selectedThreadId} onSend={handleSendMessage} />
          </FixedInput>
        </>
      ) : (
        <EmptyState>Select a thread to view messages.</EmptyState>
      )}
    </Container>
  );
}

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fdfdfd;
  border-radius: 8px;
  overflow: hidden;
`;

const ScrollableMessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 3px;
  }
`;

const MessageBubble = styled.div<{ isMe: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ isMe }) => (isMe ? '#ffffff' : '#e9ecef')};
  padding: 0.75rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const MessageText = styled.div`
  flex: 1;
`;

const PinButton = styled.button`
  margin-left: 0.75rem;
  background: transparent;
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #dee2e6;
  }
`;

const FixedInput = styled.div`
  padding: 0.75rem 1rem;
  background-color: #ffffff;
  border-top: 1px solid #dee2e6;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.03);
`;

const EmptyState = styled.div`
  padding: 1rem;
  color: #6c757d;
  text-align: center;
`;
