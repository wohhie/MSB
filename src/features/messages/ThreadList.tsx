import React from 'react';

interface Thread {
  id: number;
  name: string;
}

interface ThreadListProps {
  threads: Thread[];
  selectedThreadId: number | null;
  onSelectThread: (id: number) => void;
}

export const ThreadList: React.FC<ThreadListProps> = ({
  threads,
  selectedThreadId,
  onSelectThread,
}) => {
  return (
    <div className="border-end bg-light" style={{ width: 250 }}>
      <div className="p-3 fw-bold border-bottom">Threads</div>
      <ul className="list-group list-group-flush">
        {threads.map(thread => (
          <li
            key={thread.id}
            className={`list-group-item list-group-item-action ${
              thread.id === selectedThreadId ? 'active' : ''
            }`}
            role="button"
            onClick={() => onSelectThread(thread.id)}
          >
            {thread.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
