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
        fetch('/api/messages', {
            method: 'get',
        })
            .then((res) => res.json())
            .then((json) => setMessages(json));
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

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        fetch('/api/messages', {
            method: 'POST',
            body: formData,
        })
            .then((res) => {
                fetchMessages();
            })
            .catch(() => {});
    };

    return (
        <main>
            <div className="absolute top-0 left-0 w-full h-full bg-conic/decreasing from-indigo-600 via-sky-500 to-cyan-300 p-20 blur-[120px] animate-bgAnimation"></div>

            {/* 🧱 Messages List - TODO: map messages here */}
            <section></section>

            {/* 📝 Form - TODO: hook up inputs and submit */}
            <section className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start relative z-1 p-20">
                <h1>Add a message:</h1>
                <form
                    className="backdrop-blur-[16px] backdrop-saturate-180 bg-white/50 p-5 rounded-md"
                    action=""
                    onSubmit={handleSubmit}
                >
                    <label className="p-4" htmlFor="name">
                        Name:
                    </label>
                    <input className=" bg-slate-50/50 p-4 rounded-md" type="text" name="name" />
                    <label className="p-4" htmlFor="message">
                        Message:
                    </label>
                    <input
                        className="bg-slate-50/50 p-4 rounded-md m-4"
                        type="text"
                        name="message"
                    />
                    <button
                        className="p-4 ms-px bg-slate-50/50 rounded-md text-center"
                        type="submit"
                    >
                        submit
                    </button>
                </form>
                <div className="">
                    <h1 className="">Message Board:</h1>
                    <div>
                        {messages.map((message, index) => {
                            return (
                                <div className="">
                                    <span className="font-bold">{message.name}: </span>
                                    {message.message}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </main>
    );
}
