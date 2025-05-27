// 📝 In-memory message store

import { Message } from '../types/message';

let messages: Message[] = [];

export const getLatestMessages = (): Message[] => {
    return messages.slice(-20).reverse();
};

export const addMessage = (msg: Message): void => {
    messages.push(msg);
    if (messages.length > 100) messages = messages.slice(-100);
};
