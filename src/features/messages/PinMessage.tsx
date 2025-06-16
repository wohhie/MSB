import React from 'react';

interface Message {
  id: number;
  sender: string;
  text: string;
}

interface PinMessageProps {
  message: Message;
  onUnpin: () => void;
}

export const PinMessage: React.FC<PinMessageProps> = ({ message, onUnpin }) => (
  <div
    className="alert alert-info d-flex justify-content-between align-items-center m-3"
    style={{ borderRadius: '8px' }}
  >
    <div>
      <strong>Pinned:</strong> {message.sender}: {message.text}
    </div>
    <button className="btn btn-sm btn-outline-danger" onClick={onUnpin}>
      Unpin
    </button>
  </div>
);
