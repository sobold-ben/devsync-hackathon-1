// ✅ To be implemented by devs:
// - Accept GET (return last 20 messages)
// - Accept POST (store message)

import type { NextApiRequest, NextApiResponse } from 'next';
import { getLatestMessages, addMessage } from '@/app/lib/messages';
import { Message } from '@/app/types/message';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        // TODO: return last 20 messages
    }

    if (req.method === 'POST') {
        // TODO: store it
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
