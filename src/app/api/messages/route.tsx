// ✅ To be implemented by devs:
// - Accept GET (return last 20 messages)
// - Accept POST (store message)
// app/api/messages/route.ts

import { NextResponse } from 'next/server';
import { getMessages, addMessage } from '@/app/lib/messages';
import { Message } from '@/app/types/message';
import { randomUUID } from 'crypto';

//? getMessages will return all input messages
//? addMessage will add a message to storage

export async function GET() {
    const messages = getMessages();

    return NextResponse.json(
        messages.sort((a: Message, b: Message) => b.timestamp - a.timestamp).slice(0, 20)
    );
}

export async function POST(request: Request) {
    try {
        const formData = await request.formData(); // ⬅️ Parse multipart form data

        const id = randomUUID() as string;
        const name = formData.get('name') as string;
        const message = formData.get('message') as string;
        const timestamp = Date.now();

        addMessage({ id, name, message, timestamp });

        return NextResponse.json({ success: true }, { status: 201 });
    } catch {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }
}
