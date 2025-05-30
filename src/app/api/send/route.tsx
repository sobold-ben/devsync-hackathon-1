import { NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

export async function POST(req) {
    try {
        const { message } = await req.json();

        if (!message || typeof message !== 'string') {
            return NextResponse.json({ error: 'Wrong message' }, { status: 400 });
        }

        const filePath = path.join(process.cwd(), 'public', 'data', 'messages.json');
        const fileData = await readFile(filePath, 'utf8');
        const allMessages = JSON.parse(fileData);

        allMessages.push(message);

        await writeFile(filePath, JSON.stringify(allMessages, null, 2), 'utf8');

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Wright error' }, { status: 500 });
    }
}
