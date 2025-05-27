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
    const [messages, setMessages] = useState<Message[]>([]);

    const fetchMessages = async () => {
        // TODO: fetch messages and update state
    };

    const postMessage = async () => {
        // TODO: validate text
        // TODO: set body
        // TODO: send POST request
    };

    // Fetch messages every 5 seconds
    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <main>
            <h1 className="text-center text-2xl font-bold mt-4">Message Wall</h1>
            <p className="text-center">What will you create?</p>

            {/* 🧱 Messages List - TODO: map messages here */}
            <section></section>

            {/* 📝 Form - TODO: hook up inputs and submit */}
            <section></section>
        </main>
    );
}
