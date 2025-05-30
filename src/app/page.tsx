'use client';

import { useEffect, useState } from 'react';
import { Message } from './types/message';
import MessageForm from './components/message-dashboard';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages');
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const postMessage = async (message: string) => {
    if (!message.trim()) return;

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message.trim() }),
      });

      if (!res.ok) throw new Error('Failed to post message');

      fetchMessages(); // Refresh messages
    } catch (error) {
      console.error('Error posting message:', error);
    }
  };

  const handleMessageSubmit = (message: string) => {
    postMessage(message);
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <h1 className="text-center text-2xl font-bold mt-4">Message Wall</h1>
      <p className="text-center">What will you create?</p>

      {/* 🧱 Messages List */}
      <section>
        {messages.map((msg, index) => (
          <div key={index} className="border p-2 my-1 rounded bg-gray-100">
            {msg.message}
          </div>
        ))}
      </section>

      {/* 📝 Form */}
      <section className="mt-4">
        <MessageForm onSubmit={handleMessageSubmit} />
      </section>
    </main>
  );
}
