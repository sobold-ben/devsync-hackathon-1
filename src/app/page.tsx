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

    const postMessage = async (name: string, message: string) => {
        if (!message.trim()) return;

        try {
            const res = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim(), message: message.trim() }),
            });

            if (!res.ok) throw new Error('Failed to post message');

            fetchMessages();
        } catch (error) {
            console.error('Error posting message:', error);
        }
    };

    const handleMessageSubmit = (name: string, message: string) => {
        postMessage(name, message);
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

            {/* 📝 Form */}
            <section className="mt-4">
                <MessageForm onSubmit={handleMessageSubmit} />
            </section>

            {/* 🧱 Messages List */}
            <section>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className="p-2 my-1 border border-[var(--color-blue)] rounded message"
                    >
                        <p className="text-[var(--color-green)] font-bold">
                            {msg.name || 'Anonymous'}:
                        </p>
                        <p>{msg.message}</p>
                    </div>
                ))}
            </section>
        </main>
    );
}
