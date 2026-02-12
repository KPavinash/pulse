import { generateDummyUsers, User } from "./dummyData"

export interface Message {
    id: string
    senderId: string
    text: string
    image?: string
    timestamp: string
    isMe: boolean
}

export interface Conversation {
    id: string
    user: User
    lastMessage: string
    lastMessageTime: string
    unreadCount: number
    messages: Message[]
}

const FLIRTY_MESSAGES = [
    "Hey stranger... 😉",
    "Your vibe is intoxicating.",
    "I was just thinking about you... 🔥",
    "Are you always this cute?",
    "We should definitely grab a drink sometime.",
    "Your eyes are mesmerizing.",
    "I bet you're trouble... 😈",
    "Stop distracting me! jk, never stop.",
    "So, what brings a catch like you here?",
    "I had a dream about you last night...",
    "Send a pic? 📸",
    "You looked amazing in that last photo.",
    "My place or yours? 😉",
    "I can't focus on work today thanks to you.",
    "Come over later...",
    "I'm bored, entertain me?",
    "You have no idea what I'd do to you right now.",
    "Send location 📍",
    "Miss me yet?",
    "Good morning handsome/beautiful ☀️"
];

const AGGRESSIVE_FLIRT = [
    "I need you right now.",
    "Thinking about your lips...",
    "It's getting hot in here 🥵",
    "You're making me crazy.",
    "Don't make me beg...",
];

const UNSPLASH_IMAGES = [
    "https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=400&auto=format&fit=crop", // City
    "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=400&auto=format&fit=crop", // Neon
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop", // Selfie
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop", // Guy
    "https://images.unsplash.com/photo-1570158268183-d296b2892211?q=80&w=400&auto=format&fit=crop", // Abstract
    "https://images.unsplash.com/photo-1542206391-7f9492806184?q=80&w=400&auto=format&fit=crop", // Drink
];

export function generateDummyChats(): Conversation[] {
    const users = generateDummyUsers(20); // Top 20 users for chat

    return users.map((user, i) => {
        const messageCount = 5 + Math.floor(Math.random() * 15); // 5-20 messages
        const messages: Message[] = [];

        for (let j = 0; j < messageCount; j++) {
            const isMe = Math.random() > 0.5;
            const hasImage = Math.random() > 0.9; // 10% chance of image
            const textPool = j > messageCount - 3 ? AGGRESSIVE_FLIRT : FLIRTY_MESSAGES;

            messages.push({
                id: `msg-${i}-${j}`,
                senderId: isMe ? "me" : user.id,
                text: textPool[Math.floor(Math.random() * textPool.length)],
                image: hasImage ? UNSPLASH_IMAGES[Math.floor(Math.random() * UNSPLASH_IMAGES.length)] : undefined,
                timestamp: new Date(Date.now() - (messageCount - j) * 1000000).toISOString(),
                isMe
            });
        }

        const lastMsg = messages[messages.length - 1];

        return {
            id: user.id, // Use user ID as conversation ID for simplicity
            user,
            lastMessage: lastMsg.image ? "Sent a photo 📸" : lastMsg.text,
            lastMessageTime: lastMsg.timestamp,
            unreadCount: Math.floor(Math.random() * 3), // 0-2 unread
            messages
        };
    });
}

// Singleton to persist chat state in memory during session
let _cachedChats: Conversation[] | null = null;

export function getChats(): Conversation[] {
    if (!_cachedChats) {
        _cachedChats = generateDummyChats();
    }
    return _cachedChats;
}

export function getChatById(id: string): Conversation | undefined {
    return getChats().find(c => c.id === id);
}
