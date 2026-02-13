"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid, Map, MessageSquare, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export function BottomNav() {
    const pathname = usePathname()
    const unreadCount = 3 // Mock unread count for demo

    const navItems = [
        {
            name: "Grid",
            href: "/",
            icon: LayoutGrid,
        },
        {
            name: "Map",
            href: "/map",
            icon: Map,
        },
        {
            name: "Chat",
            href: "/chat",
            icon: MessageSquare,
        },
        {
            name: "Profile",
            href: "/profile", // Changed to generic /profile for now, redirect logic might handle ID
            icon: User,
        },
    ]

    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
            <nav className="relative flex items-center justify-around px-2 py-3 bg-card dark:bg-black/40 dark:backdrop-blur-xl border border-muted dark:border-white/10 rounded-full shadow-lg dark:shadow-2xl">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.name === "Profile" && pathname.startsWith("/profile"));

                    return (
                        <Link
                            key={item.name}
                            href={item.name === "Profile" ? "/profile/user-current" : item.href}
                            className="relative flex flex-col items-center justify-center w-12 h-12"
                        >
                            <motion.div
                                whileTap={{ scale: 0.9 }}
                                className="relative flex items-center justify-center w-full h-full"
                            >
                                {/* Active State Glow - REMOVED for Solid Theme or kept as subtle highlight? User said "remove glass effects", not glows. But "solid theme" implies less glow. I'll keep a sharp lime circle behind maybe? Or just text color. Let's keep the glow but make it sharp Lime. */}
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-glow"
                                        className="absolute inset-0 bg-brand-primary dark:bg-gradient-to-r dark:from-cyan-500/30 dark:to-purple-500/30 rounded-full mix-blend-overlay dark:mix-blend-normal opacity-20 dark:opacity-100 dark:blur-md"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    />
                                )}

                                {/* Icon */}
                                <item.icon
                                    className={cn(
                                        "w-6 h-6 z-10 transition-colors duration-300",
                                        isActive ? "text-brand-primary dark:text-white" : "text-white/60 dark:text-white/50"
                                    )}
                                    strokeWidth={isActive ? 3 : 2}
                                />

                                {/* Notification Badge (Chat only) */}
                                {item.name === "Chat" && unreadCount > 0 && (
                                    <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-black z-20" />
                                )}
                            </motion.div>
                        </Link>
                    )
                })}
            </nav>
        </div>
    )
}
