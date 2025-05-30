'use client';

import { useEffect, useState } from 'react';
import { Message } from './types/message';

/**
 * 🛠️ Hackathon Message Wall
 *
 * 🧠 Core Idea:
 *  Users can post short public messages with an optional name.
 *  Messages appear instantly (polling every 5 seconds).
 *
 * 🔌 API Details:
 *  Endpoint: /api/messages
 *  Methods:
 *    - GET     → Returns latest 20 messages (newest first)
 *    - POST    → Accepts { name?, message } and stores it
 *
 * 🔐 Validation Rules:
 *  - message: required, 1–140 characters
 *  - name: optional, max 30 characters
 *
 * 🎯 Completion Goals:
 *  - Input form (name + message)
 *  - Submit message via POST
 *  - Fetch + display last 20 messages via GET
 *  - Poll API every 5 seconds to refresh messages
 *
 * 🚀 Extra Ideas (optional stretch goals):
 *  - Timestamp display ("3m ago", etc.)
 *  - Emoji support or markdown (basic)
 *  - Highlight own messages (e.g. use localStorage to tag posts)
 *  - Limit rate (e.g. only 1 post per 10 seconds)
 *  - Add avatars (random emoji/avatar from name hash)
 */

export default function Home() {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const [name, setName] = useState('');

    const fetchMessages = async () => {
        try {
            const res = await fetch('/api/messages');
            const data = await res.json();
            setMessages(data);
        } catch (e) {
            console.error('Error loading messages:', e);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const postMessage = async () => {
        if (!text.trim()) return;

        try {
            const res = await fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim(), message: text.trim() }),
            });

            if (res.ok) {
                fetchMessages();
                setText('');
            } else {
                console.error('Error sending');
            }
        } catch (e) {
            console.error('Network error:', e);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            postMessage();
        }
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-black text-green-400 font-pixel text-green-400 font-pixel">
            <h1 className="text-2xl mb-4">PIXEL CHAT</h1>

            <div className="w-full max-w-xl bg-gray-900 border border-green-500 p-4">
                <div className="h-64 overflow-y-auto mb-4 border border-green-400 p-2 font-mono text-sm leading-relaxed bg-black">
                    {messages.map((msg, i) => (
                        <p key={i} className="mb-2">
                            {msg.name && <strong className="text-green-500">{msg.name}: </strong>}
                            {msg.message}
                        </p>
                    ))}
                </div>

                <div className="flex">
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength={30}
                        placeholder="Your name (optional)"
                        className="w-full p-2 bg-black border border-green-400 text-green-300 font-mono outline-none"
                    />
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="ml-2 flex-1 p-2 bg-black border border-green-400 text-green-300 font-mono outline-none"
                        placeholder="Type your message..."
                    />
                    <button
                        onClick={postMessage}
                        className="ml-2 px-4 py-2 bg-green-600 text-black hover:bg-green-400"
                    >
                        Send
                    </button>
                </div>
            </div>
        </main>
    );
}
