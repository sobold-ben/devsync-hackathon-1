'use client';

import React, { useState, FormEvent } from 'react';

export default function MessageForm({
    onSubmit,
}: {
    onSubmit: (name: string, message: string) => void;
}) {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(name, message);
        setMessage('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                className="block mb-2 w-full p-2"
                type="text"
                placeholder="Your (optional) name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <textarea
                className="block mb-2 w-full p-2"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Send</button>
        </form>
    );
}
