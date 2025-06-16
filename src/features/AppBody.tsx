import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ThreadList } from './messages/ThreadList';
import { MessageContent } from './messages/MessageContent';
import { PinMessage } from './messages/PinMessage';

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

export function AppBody() {
  const [activeTab, setActiveTab] = useState<'messages' | 'profile' | 'settings'>('messages');
  const [threads, setThreads] = useState<Thread[]>([
    {
      id: 1,
      name: 'Alice',
      messages: [
        { id: 1, sender: 'Alice', text: 'Hey there!' },
        { id: 2, sender: 'Me', text: 'Hello Alice!' },
      ],
    },
    {
      id: 2,
      name: 'Bob',
      messages: [{ id: 1, sender: 'Bob', text: 'Hi, how are you?' }],
    },
  ]);
  const [selectedThreadId, setSelectedThreadId] = useState<number | null>(1);
  const [pinnedMessageId, setPinnedMessageId] = useState<number | null>(null);

  useEffect(() => {
    if (selectedThreadId !== null) {
      const selectedThread = threads.find(t => t.id === selectedThreadId);
      const pinned = selectedThread?.messages.find(m => m.pinned);
      setPinnedMessageId(pinned?.id ?? null);
    }
  }, [selectedThreadId, threads]);

  const selectedThread = threads.find(t => t.id === selectedThreadId);

  return (
    <AppContainer>
      <MainContent>
        <ThreadList
          threads={threads}
          selectedThreadId={selectedThreadId}
          onSelectThread={setSelectedThreadId}
        />

        <RightPanel>
          <TabBar>
            {['messages', 'profile', 'settings'].map(tab => (
              <TabButton
                key={tab}
                className={activeTab === tab ? 'active' : ''}
                onClick={() => setActiveTab(tab as any)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabButton>
            ))}
          </TabBar>

          {pinnedMessageId !== null && selectedThread && (() => {
            const pinnedMsg = selectedThread.messages.find(m => m.id === pinnedMessageId);
            if (!pinnedMsg) return null;

            return (
              <PinMessage
                message={pinnedMsg}
                onUnpin={() => {
                  setThreads(prev =>
                    prev.map(thread =>
                      thread.id === selectedThreadId
                        ? {
                            ...thread,
                            messages: thread.messages.map(m =>
                              m.id === pinnedMessageId ? { ...m, pinned: false } : m
                            ),
                          }
                        : thread
                    )
                  );
                  setPinnedMessageId(null);
                }}
              />
            );
          })()}

          <ContentCard>
            <CardBody>
              {activeTab === 'messages' && selectedThreadId !== null && (
                <MessageContent
                  threads={threads}
                  selectedThreadId={selectedThreadId}
                  setThreads={setThreads}
                  setSelectedThreadId={setSelectedThreadId}
                  setPinnedMessageId={setPinnedMessageId}
                  pinnedMessageId={pinnedMessageId}
                />
              )}
              {activeTab === 'profile' && <div>Profile tab content goes here.</div>}
              {activeTab === 'settings' && <div>Settings tab content goes here.</div>}
            </CardBody>
          </ContentCard>
        </RightPanel>
      </MainContent>
    </AppContainer>
  );
}

// Styled Components
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  flex-grow: 1;
  overflow: hidden;
`;

const RightPanel = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;







const TabBar = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  border-bottom: 1px solid #dee2e6;
  background-color: #f8f9fa;
`;

const TabButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  cursor: pointer;
  &.active {
    font-weight: bold;
    border-bottom: 2px solid #007bff;
  }
`;

const ContentCard = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 1rem;
  border: 1px solid red;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
  min-height: 0; /* ✅ allow child flex items to calculate height correctly */
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0; /* ✅ critical for scrollable children */
`;