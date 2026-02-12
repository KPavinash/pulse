"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Grid, Map, MessageCircle, User } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNav() {
    const pathname = usePathname()

    const navItems = [
        {
            name: "Grid",
            href: "/",
            icon: Grid,
        },
        {
            name: "Map",
            href: "/map",
            icon: Map,
        },
        {
            name: "Chat",
            href: "/chat",
            icon: MessageCircle,
        },
        {
            name: "Profile",
            href: "/profile",
            icon: User,
        },
    ]

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-6 bg-brand-dark/80 backdrop-blur-md border-t border-white/10">
            <nav className="flex items-center justify-around max-w-md mx-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300",
                                isActive
                                    ? "text-brand-primary scale-110 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                                    : "text-gray-500 hover:text-white"
                            )}
                        >
                            <item.icon className={cn("w-6 h-6", isActive && "animate-pulse-slow")} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[10px] mt-1 font-medium">{item.name}</span>
                        </Link>
                    )
                })}
            </nav>
        </div>
    )
}
