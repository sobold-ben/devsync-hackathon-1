'use client';

import React, { useState, FormEvent } from 'react';

export type MessageFormProps = {
  onSubmit: (message: string) => void;
  placeholder?: string;
  buttonLabel?: string;
};

const MessageForm: React.FC<MessageFormProps> = ({
  onSubmit,
  placeholder = 'Type your message...',
  buttonLabel = 'Send',
}) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    onSubmit(message.trim());
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholder}
        className="flex-1 border border-gray-300 p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        {buttonLabel}
      </button>
    </form>
  );
};

export default MessageForm;
