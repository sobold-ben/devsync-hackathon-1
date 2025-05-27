// 📝 In-memory message store
// ! You shouldnt need to touch this file

import { Message } from '@/app/types/message';

// Use globalThis to persist across server instances during runtime
const globalForMessages = globalThis as typeof globalThis & { messages?: Message[] };

globalForMessages.messages ??= [];

export const messages = globalForMessages.messages;

export function getMessages(): Message[] {
    return messages;
}

export function addMessage(msg: Message): void {
    messages.push(msg);
}
