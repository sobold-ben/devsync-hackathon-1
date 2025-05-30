'use client';

import { useEffect, useState } from 'react';
import '@fontsource/press-start-2p';

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
        <main className="min-h-screen bg-yellow-300 font-['Press_Start_2P'] text-black p-4">
            {/* Header */}
            <header className="text-center border-4 border-black bg-yellow-400 p-4 mb-6 shadow-md">
                <h1 className="text-[20px] tracking-wider">🕹️ TEAM ALPHA</h1>
            </header>

            {/* Layout: Form + Messages */}
            <div className="flex flex-col md:flex-row gap-6 max-w-6xl mx-auto">
                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="flex-1 bg-yellow-200 border-4 border-black p-4 shadow-md space-y-4"
                >
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border-2 border-black bg-yellow-100 text-black placeholder-black"
                        required
                    />
                    <textarea
                        placeholder="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-2 border-2 border-black bg-yellow-100 text-black placeholder-black"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-black text-yellow-200 p-2 border-2 border-black hover:bg-yellow-500 hover:text-black transition"
                    >
                        SEND
                    </button>
                    {status && <p className="text-center">{status}</p>}
                </form>

                {/* Message List */}
                <div className="flex-1 bg-yellow-100 border-4 border-black p-4 shadow-md space-y-4">
                    <h2 className="text-[16px] text-center border-b-2 border-black pb-2">
                        Recent Messages
                    </h2>
                    {messages.length === 0 ? (
                        <p className="text-center">No messages yet.</p>
                    ) : (
                        messages.map((msg) => (
                            <div
                                key={msg.id}
                                className="border-2 border-black bg-yellow-50 p-3 shadow"
                            >
                                <p className="font-bold">{msg.name}</p>
                                <p>{msg.message}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}
