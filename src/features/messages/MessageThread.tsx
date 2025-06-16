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

interface MessageTreadProps {
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
                             }: MessageTreadProps) {

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
                            <div
                                key={message.id}
                                className={`p-2 mb-2 rounded d-flex justify-content-between ${
                                    message.sender === 'Me' ? 'bg-white' : 'bg-light'
                                }`}
                            >
                                <div>
                                    <strong>{message.sender}:</strong> {message.text}
                                </div>
                                <button
                                    className="btn btn-sm btn-outline-secondary ms-2"
                                    onClick={() => setPinnedMessageId(message.id)}
                                >
                                    📌
                                </button>
                            </div>
                        ))}
                    </ScrollableMessageList>

                    <FixedInput>
                        <MessageInput key={selectedThreadId} onSend={handleSendMessage} />
                    </FixedInput>
                </>
            ) : (
                <div className="text-muted p-3">Select a thread to view messages.</div>
            )}
        </Container>
    );

};


const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ScrollableMessageList = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 1rem;
`;

const FixedInput = styled.div`
  padding: 0.75rem;
`;