"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { User } from "@/lib/dummyData"
import Image from "next/image"
import Link from "next/link"
import { Heart, MessageCircle, Bookmark, X } from "lucide-react"

interface PulseGridProps {
    users: User[]
}

export function PulseGrid({ users }: PulseGridProps) {
    // Show top 50 users
    const displayUsers = users.slice(0, 50);
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

    const handleLongPress = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        setActiveMenuId(id === activeMenuId ? null : id);
    };

    return (
        <div className="w-full h-full pb-32 px-2 overflow-y-auto scrollbar-hide">
            {/* 2-Column Grid as requested */}
            <div className="grid grid-cols-2 gap-3 pb-8">
                {displayUsers.map((user, index) => {
                    const isLocked = index >= 4;

                    return (
                        <div
                            key={user.id}
                            className="relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer group select-none"
                            onContextMenu={(e) => handleLongPress(e, user.id)}
                            onClick={(e) => {
                                if (activeMenuId) {
                                    e.preventDefault();
                                    setActiveMenuId(null);
                                }
                            }}
                        >
                            {/* Base Card Link */}
                            <Link
                                href={isLocked ? "/subscription" : `/profile/${user.id}`}
                                className={`block w-full h-full transition-transform duration-300 ${activeMenuId === user.id ? 'scale-95 blur-sm' : 'active:scale-95'}`}
                            >
                                {/* Image Layer */}
                                <Image
                                    src={user.avatar}
                                    alt={user.username}
                                    fill
                                    className={`object-cover transition-transform duration-700 ${isLocked ? 'blur-md brightness-50 contrast-125' : 'group-hover:scale-110'}`}
                                />

                                {/* Lock Overlay for Premium */}
                                {isLocked && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-card dark:bg-black/20 dark:backdrop-blur-md">
                                        <div className="w-12 h-12 rounded-full bg-indigo-900/50 dark:bg-white/10 dark:backdrop-blur-xl border border-brand-primary dark:border-white/20 flex items-center justify-center mb-2 shadow-lg">
                                            <div className="w-8 h-8 text-brand-primary dark:text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg></div>
                                        </div>
                                        <span className="text-xs font-bold text-white dark:text-white tracking-widest uppercase mb-1 drop-shadow-sm">Premium</span>
                                        <span className="text-[10px] text-white/70 dark:text-white/80">Tap to unlock</span>
                                    </div>
                                )}

                                {/* Warm Peach/Orange Gradient Overlay (Hidden if locked) */}
                                {!isLocked && <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-rose-400 to-purple-500 opacity-20 group-hover:opacity-10 transition-opacity duration-300" />}

                                {/* Text Overlay (Hidden if locked) */}
                                {!isLocked && (
                                    <>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />
                                        <div className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-lg flex items-center justify-center">
                                            <span className="text-sm drop-shadow-md">{user.vibe}</span>
                                        </div>
                                        <div className="absolute bottom-3 left-3 right-3 text-white">
                                            <h3 className="text-lg font-bold leading-tight drop-shadow-md">
                                                {user.username}, {user.age}
                                            </h3>
                                            <div className="flex items-center gap-1.5 mt-1">
                                                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)] animate-pulse" />
                                                <span className="text-xs font-medium text-white/90 shadow-black drop-shadow-sm">
                                                    {user.distance} mi
                                                </span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </Link>
                            {/* ... Radial Menus ... (Only show if not locked - logic handled by click interception anyway, but menus inside map need user) */}
                            <AnimatePresence>
                                {!isLocked && activeMenuId === user.id && (
                                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                                        <div className="relative w-full h-full flex items-center justify-center">
                                            <motion.button
                                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: -40, x: 0 }} exit={{ opacity: 0, scale: 0 }}
                                                className="absolute flex flex-col items-center gap-1"
                                            >
                                                <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-xl border border-rose-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(244,63,94,0.5)]">
                                                    <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
                                                </div>
                                                <span className="text-[10px] font-bold text-white bg-black/50 px-2 rounded-full">Quick Pulse</span>
                                            </motion.button>
                                            <motion.button
                                                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: -50, y: 30 }} exit={{ opacity: 0, scale: 0 }}
                                                className="absolute flex flex-col items-center gap-1"
                                            >
                                                <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-xl border border-cyan-400/50 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.5)]">
                                                    <MessageCircle className="w-6 h-6 text-cyan-400" />
                                                </div>
                                                <span className="text-[10px] font-bold text-white bg-black/50 px-2 rounded-full">Chat</span>
                                            </motion.button>
                                            <motion.button
                                                initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 50, y: 30 }} exit={{ opacity: 0, scale: 0 }}
                                                className="absolute flex flex-col items-center gap-1"
                                            >
                                                <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-xl border border-amber-400/50 flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.5)]">
                                                    <Bookmark className="w-6 h-6 text-amber-400" />
                                                </div>
                                                <span className="text-[10px] font-bold text-white bg-black/50 px-2 rounded-full">Save</span>
                                            </motion.button>
                                            <div className="absolute top-2 right-2" onClick={(e) => { e.stopPropagation(); setActiveMenuId(null); }}>
                                                <X className="w-6 h-6 text-white/50" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    )
                })}
            </div>
            <div className="text-center py-8 text-gray-500 text-xs pb-32">
                <p>Long-press (Right-click) cards for quick actions</p>
            </div>
        </div>
    )
}
