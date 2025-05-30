'use client';

import { useEffect, useState } from 'react';

type Message = {
    id: string;
    name: string;
    message: string;
};

export default function Page() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [status, setStatus] = useState<string | null>(null);

    const fetchMessages = async () => {
        const res = await fetch('/api/messages');
        const data = await res.json();
        setMessages(data.slice(-20).reverse());
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: crypto.randomUUID(),
                name,
                message,
            }),
        });

        if (res.ok) {
            setStatus('Message sent!');
            setMessage('');
            fetchMessages();
        } else {
            setStatus('Failed to send message.');
        }
    };

    return (
        <main className="p-4 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Send a Message</h1>

            <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2 w-full"
                    required
                />
                <textarea
                    placeholder="Your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border p-2 w-full"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white p-2">
                    Send Message
                </button>
                {status && <p>{status}</p>}
            </form>

            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Recent Messages</h2>
                {messages.length === 0 ? (
                    <p>No messages yet.</p>
                ) : (
                    messages.map((msg) => (
                        <div key={msg.id} className="border p-2 rounded">
                            <p className="font-bold">{msg.name}</p>
                            <p>{msg.message}</p>
                        </div>
                    ))
                )}
            </div>
        </main>
    );
}
