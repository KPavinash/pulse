"use client"

import { useParams, useRouter } from "next/navigation"
import { getChatById } from "@/lib/dummyChatData"
import { ArrowLeft, Send, Image as ImageIcon, Phone, Video, MoreVertical } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function ChatDetailPage() {
    const params = useParams()
    const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
    const router = useRouter();

    // In a real app we'd fetch async. Here for demo we get direct.
    // We use state to allow "sending" messages
    const initialChat = id ? getChatById(id) : undefined;
    const [messages, setMessages] = useState(initialChat?.messages || []);
    const [inputText, setInputText] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    if (!initialChat || !id) return <div className="p-10 text-center">Chat not found</div>;

    const handleSend = () => {
        if (!inputText.trim()) return;

        const newMsg = {
            id: `new-${Date.now()}`,
            senderId: "me",
            text: inputText,
            timestamp: new Date().toISOString(),
            isMe: true
        };

        setMessages([...messages, newMsg]);
        setInputText("");

        // Simulate reply after 2 seconds
        setTimeout(() => {
            const replyMsg = {
                id: `reply-${Date.now()}`,
                senderId: initialChat.user.id,
                text: "That's hot... tell me more 😉",
                timestamp: new Date().toISOString(),
                isMe: false
            };
            setMessages(prev => [...prev, replyMsg]);
        }, 2000);
    }

    return (
        <div className="flex flex-col h-screen bg-black text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black pointer-events-none" />

            {/* Floating Glass Header */}
            <div className="absolute top-4 left-4 right-4 z-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex items-center justify-between shadow-2xl">
                <div className="flex items-center gap-2">
                    <button onClick={() => router.back()} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ArrowLeft className="w-5 h-5 text-gray-200" />
                    </button>
                    <div className="relative w-10 h-10">
                        <Image
                            src={initialChat.user.avatar}
                            alt={initialChat.user.username}
                            fill
                            className="object-cover rounded-full border border-white/10"
                        />
                        {initialChat.user.isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                        )}
                    </div>
                    <div className="ml-1">
                        <h2 className="font-bold text-sm tracking-wide">{initialChat.user.username}</h2>
                        <span className="text-[10px] text-brand-primary font-medium tracking-wider flex items-center gap-1">
                            {initialChat.user.isOnline ? (
                                <>
                                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                                    ONLINE
                                </>
                            ) : "OFFLINE"}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-1 pr-1">
                    <Link href={`/call/${id}?type=audio`} className="p-2 hover:bg-white/10 rounded-full text-gray-300 hover:text-white transition-colors">
                        <Phone className="w-5 h-5" />
                    </Link>
                    <Link href={`/call/${id}?type=video`} className="p-2 hover:bg-white/10 rounded-full text-gray-300 hover:text-white transition-colors">
                        <Video className="w-5 h-5" />
                    </Link>
                    <button className="p-2 hover:bg-white/10 rounded-full text-gray-300 hover:text-white transition-colors">
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto pt-24 pb-4 px-4 space-y-6 scrollbar-hide z-10">
                <AnimatePresence initial={false}>
                    {messages.map((msg, index) => {
                        const isLast = index === messages.length - 1;
                        return (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                key={msg.id}
                                className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}
                            >
                                {!msg.isMe && (
                                    <div className="w-8 h-8 relative rounded-full overflow-hidden mr-2 mt-auto pb-1">
                                        <Image src={initialChat.user.avatar} alt="Avatar" fill className="object-cover" />
                                    </div>
                                )}

                                <div className={`max-w-[75%] shadow-lg backdrop-blur-sm ${msg.isMe
                                    ? 'bg-gradient-to-br from-brand-primary to-brand-secondary text-white rounded-2xl rounded-tr-sm'
                                    : 'bg-white/10 border border-white/5 text-gray-100 rounded-2xl rounded-tl-sm'
                                    }`}>
                                    {msg.image && (
                                        <div className="rounded-t-2xl overflow-hidden relative w-full aspect-[4/5] min-w-[200px]">
                                            <Image src={msg.image} alt="Sent image" fill className="object-cover" />
                                        </div>
                                    )}
                                    <div className={`px-4 py-2 ${msg.image ? 'pt-2' : ''}`}>
                                        <p className="text-[15px] leading-relaxed">{msg.text}</p>
                                        <span className={`text-[10px] block text-right mt-1 ${msg.isMe ? 'text-white/70' : 'text-gray-400'}`}>
                                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>

            {/* Floating Input Area */}
            <div className="p-4 z-20">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full px-2 py-2 shadow-2xl">
                    <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-brand-primary transition-colors">
                        <ImageIcon className="w-5 h-5" />
                    </button>
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type a message..."
                        className="flex-1 bg-transparent border-none focus:outline-none text-sm text-white placeholder:text-gray-500 px-2"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!inputText.trim()}
                        className="p-2.5 rounded-full bg-brand-primary text-black disabled:opacity-50 disabled:scale-95 disabled:cursor-not-allowed hover:scale-105 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all"
                    >
                        <Send className="w-4 h-4 fill-black" />
                    </button>
                </div>
            </div>
        </div>
    )
}
