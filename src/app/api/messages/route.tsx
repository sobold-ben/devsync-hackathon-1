// ✅ To be implemented by devs:
// - Accept GET (return last 20 messages)
// - Accept POST (store message)
// app/api/messages/route.ts

import { NextResponse } from 'next/server';
import { getMessages, addMessage } from '@/app/lib/messages';
import { Message } from '@/app/types/message';

// //? getMessages will return all input messages
// //? addMessage will add a message to storage

export async function GET() {
    // Return only latest 20 messages, newest first
    const messages = getMessages()
        .sort((a, b) => b.timestamp - a.timestamp)
        .slice(0, 20);

    return NextResponse.json(messages);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const name = (body.name || '').trim().slice(0, 30);
        const message = (body.message || '').trim();

        // Validate message
        if (!message || message.length < 1 || message.length > 140) {
            return NextResponse.json(
                { error: 'Message must be between 1–140 characters.' },
                { status: 400 }
            );
        }

        const newMessage: Message = {
            id: crypto.randomUUID(),
            name,
            message,
            timestamp: Date.now(),
        };

        addMessage(newMessage);

        return NextResponse.json(newMessage, { status: 201 });
    } catch {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }
}
