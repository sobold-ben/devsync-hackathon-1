// ✅ To be implemented by devs:
// - Accept GET (return last 20 messages)
// - Accept POST (store message)
// app/api/messages/route.ts

// import { NextResponse } from 'next/server';
// import { getMessages, addMessage } from '@/app/lib/messages';
// import { Message } from '@/app/types/message';

// //? getMessages will return all input messages
// //? addMessage will add a message to storage

// export async function GET() {
//     return NextResponse.json(getMessages());
// }

// export async function POST(request: Request) {
//     try {
//         console.log(await request.json());

//         addMessage({
//             id: 'some_id',
//             name: 'developer',
//             message: 'this is a message',
//         });

//         return NextResponse.json({ success: true }, { status: 201 });
//     } catch {
//         return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
//     }
// }

import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'public', 'data', 'messages.json');
        const fileData = await readFile(filePath, 'utf8');
        const allMessages = JSON.parse(fileData);

        const latestMessages = allMessages.slice(-20);

        return NextResponse.json(latestMessages, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Error reading file' }, { status: 500 });
    }
}
