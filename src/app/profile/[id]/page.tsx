"use client"

import { useParams } from "next/navigation"
import Image from "next/image"
import { Bell, Settings, Camera, MapPin, BadgeCheck, Sparkles, Heart, ArrowLeft, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getUserById } from "@/lib/dummyData"

export default function UserProfilePage() {
    const params = useParams()
    // Ensure params.id is a string (handle array case)
    const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

    if (!id) return <div>ID required</div>;

    const user = getUserById(id);

    if (!user) {
        return (
            <div className="flex h-screen items-center justify-center bg-black text-white">
                <p>User not found</p>
                <Link href="/" className="ml-4 text-brand-primary underline">Go Home</Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen w-full bg-background text-foreground pb-24 overflow-x-hidden relative">
            {/* Background: Blurred Urban Cityscape */}
            {/* Background: Hidden in Vibrant Theme */}
            <div
                className="fixed inset-0 z-0 bg-cover bg-center opacity-60 pointer-events-none hidden dark:block"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070&auto=format&fit=crop')", // Cityscape placeholder
                    filter: "blur(8px) brightness(0.4)"
                }}
            />
            {/* Fallback gradient if image fails/loads slow */}
            <div className="fixed inset-0 z-0 bg-gradient-to-b from-black/80 via-purple-900/20 to-black pointer-events-none hidden dark:block" />

            {/* Header */}
            <header className="relative z-10 flex justify-between items-center p-6 pt-8">
                <Link href="/">
                    <Button size="icon" variant="ghost" className="rounded-full bg-[#4e3fd6] dark:bg-white/10 dark:backdrop-blur-md border border-[#5d4ce6] dark:border-white/10 text-white hover:bg-[#5d4ce6] dark:hover:bg-white/20 shadow-md">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </Link>
                <h1 className="text-xl font-bold tracking-tighter text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                    {user.username}
                </h1>
                <div className="flex gap-4">
                    <Button size="icon" variant="ghost" className="rounded-full bg-[#4e3fd6] dark:bg-white/10 dark:backdrop-blur-md border border-[#5d4ce6] dark:border-white/10 text-white hover:bg-[#5d4ce6] dark:hover:bg-white/20 shadow-md">
                        <Settings className="w-5 h-5" />
                    </Button>
                </div>
            </header>

            <main className="relative z-10 px-6 space-y-8">
                {/* Profile Grid */}
                <div className="grid grid-cols-[1.5fr_1fr] gap-4 h-auto aspect-[4/3]">
                    {/* Main Avatar (Photo 1) */}
                    <div className="relative rounded-[2rem] overflow-hidden border-2 border-brand-primary/80 shadow-[0_0_15px_rgba(168,85,247,0.4)] group">
                        <Image
                            src={user.photos[0]}
                            alt={user.username}
                            fill
                            className="object-cover transform transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* MAIN Tag */}
                        {user.isOnline && (
                            <div className="absolute bottom-4 left-4">
                                <span className="px-3 py-1 rounded-full bg-brand-primary text-black font-bold text-xs tracking-widest shadow-[0_0_10px_rgba(168,85,247,0.8)] border border-brand-primary">
                                    ONLINE
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Secondary Photos Column */}
                    <div className="flex flex-col gap-4 h-full">
                        {/* Photo 2 */}
                        <div className="relative flex-1 rounded-[1.5rem] overflow-hidden border border-[#5d4ce6] dark:border-white/10 bg-[#4e3fd6] dark:bg-white/5 dark:backdrop-blur-sm group">
                            <Image
                                src={user.photos[1]}
                                alt="Detail Shot"
                                fill
                                className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                            />
                        </div>
                        {/* Photo 3 */}
                        <div className="relative flex-1 rounded-[1.5rem] overflow-hidden border border-[#5d4ce6] dark:border-white/10 bg-[#4e3fd6] dark:bg-white/5 dark:backdrop-blur-sm group">
                            <Image
                                src={user.photos[2]}
                                alt="Artistic Shot"
                                fill
                                className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Identity Section */}
                <div className="space-y-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-3xl font-bold text-white flex items-center gap-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                                {user.username}, {user.age}
                            </h2>
                            <div className="flex items-center gap-2 text-brand-primary/90 mt-1 font-medium tracking-wide">
                                <BadgeCheck className="w-5 h-5 fill-brand-primary text-black" />
                                <span className="drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]">{user.role}</span>
                                <span className="text-white/40">•</span>
                                <span className="text-gray-300">{user.location}</span>
                            </div>
                        </div>

                        {/* Chat button moved to bottom fixed position */}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {[user.status || "Chilling", "He/Him", "Single"].map((tag, i) => (
                            <span
                                key={tag}
                                className={`
                  px-4 py-1.5 rounded-full text-xs font-bold tracking-wider backdrop-blur-md border 
                  ${i === 0 ? 'bg-brand-primary/20 border-brand-primary/50 text-brand-primary shadow-[0_0_10px_rgba(168,85,247,0.2)]' :
                                        i === 1 ? 'bg-brand-secondary/20 border-brand-secondary/50 text-brand-secondary shadow-[0_0_10px_rgba(59,130,246,0.2)]' :
                                            'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                                    }
                `}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* About Me */}
                <div className="space-y-3">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-white">
                        <Sparkles className="w-5 h-5 text-brand-primary" />
                        <span className="drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">About Me</span>
                    </h3>
                    <div className="p-5 rounded-2xl bg-[#4e3fd6] dark:bg-white/5 dark:backdrop-blur-md border border-[#5d4ce6] dark:border-white/10 text-white/90 dark:text-gray-300 leading-relaxed shadow-lg">
                        <p>
                            {user.bio}
                        </p>
                    </div>
                </div>

                {/* Interests */}
                <div className="space-y-3">
                    <h3 className="text-lg font-bold flex items-center gap-2 text-white">
                        <Heart className="w-5 h-5 text-brand-primary fill-brand-primary" />
                        <span className="drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">Interests</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {user.interests.map((interest) => (
                            <div
                                key={interest.label}
                                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-primary/30 transition-colors cursor-default"
                            >
                                <span className="text-sm">{interest.icon}</span>
                                <span className="text-xs font-medium text-gray-300">{interest.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dream Date */}
                <div className="rounded-[2rem] bg-gradient-to-br from-brand-primary/10 via-black/40 to-black/60 p-6 border border-brand-primary/20 relative overflow-hidden group hover:border-brand-primary/40 transition-colors">
                    <div className="absolute inset-0 bg-brand-primary/5 blur-xl group-hover:bg-brand-primary/10 transition-colors" />
                    <h3 className="text-xs font-bold text-brand-primary tracking-[0.2em] mb-3 uppercase drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]">
                        My Dream Date
                    </h3>
                    <p className="text-xl font-medium text-white italic leading-relaxed font-serif relative z-10">
                        "Late night drives and deep conversations under the stars."
                    </p>
                </div>
            </main>

            {/* Floating "Hot Point" Chat Button (Tinder-Style) */}
            <div className="fixed bottom-28 left-0 right-0 z-50 flex justify-center pointer-events-none p-4 pb-6">
                <Link href={`/chat/${user.id}`} className="pointer-events-auto">
                    <div className="relative group">
                        {/* Pulse Ring */}
                        <div className="absolute inset-0 rounded-full bg-brand-primary opacity-50 blur-xl animate-pulse group-hover:opacity-80 transition-opacity duration-500" />

                        {/* Main FAB */}
                        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-brand-primary via-purple-500 to-blue-500 text-white shadow-[0_10px_40px_rgba(168,85,247,0.6)] border-2 border-white/30 hover:shadow-[0_0_60px_rgba(168,85,247,0.9)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer">
                            <MessageCircle className="w-9 h-9 fill-white drop-shadow-md group-hover:rotate-12 transition-transform duration-300" />
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}
