"use client"

import { getChats } from "@/lib/dummyChatData"
import Link from "next/link"
import Image from "next/image"
import { Search } from "lucide-react"

export default function ChatListPage() {
    const chats = getChats();

    return (
        <div className="min-h-screen bg-black text-white pb-24">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-black/80 backdrop-blur-md p-4 border-b border-white/10">
                <h1 className="text-2xl font-bold tracking-tight mb-4">Messages</h1>

                {/* Search Bar */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-primary/50 transition-colors"
                    />
                </div>
            </div>

            {/* Chat List */}
            <div className="px-2 pt-2">
                {chats.map((chat) => (
                    <Link href={`/chat/${chat.id}`} key={chat.id} className="flex items-center gap-3 p-3 hover:bg-white/5 rounded-xl transition-colors active:scale-[0.98]">
                        {/* Avatar */}
                        <div className="relative w-14 h-14 flex-shrink-0">
                            <Image
                                src={chat.user.avatar}
                                alt={chat.user.username}
                                fill
                                className="object-cover rounded-full border border-white/10"
                            />
                            {chat.user.isOnline && (
                                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-black rounded-full" />
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline mb-0.5">
                                <h3 className="font-bold text-base truncate">{chat.user.username}</h3>
                                <span className="text-[10px] text-gray-500">2m ago</span>
                            </div>
                            <p className={`text-sm truncate ${chat.unreadCount > 0 ? 'text-white font-medium' : 'text-gray-400'}`}>
                                {chat.lastMessage}
                            </p>
                        </div>

                        {/* Unread Badge */}
                        {chat.unreadCount > 0 && (
                            <div className="w-5 h-5 bg-brand-primary rounded-full flex items-center justify-center flex-shrink-0">
                                <span className="text-[10px] font-bold text-black">{chat.unreadCount}</span>
                            </div>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    )
}
